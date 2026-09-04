import { listConversationsPage, listGizmosSidebar, listProjectConversations } from './conversations';
import type { InventoryItem, InventoryReport, InventoryScope, ScopeInventoryResult } from './types';
import { sleep } from './utils';
import { Logger } from './logger';

export interface BuildInventoryOptions {
  includeArchived?: boolean;
  includeProjects?: boolean;
  progressCb?: (statusText: string, currentCount: number) => void;
}

/**
 * Deduplicates and merges conversation metadata from different scopes.
 */
export function mergeInventoryItem(
  map: Map<string, InventoryItem>,
  item: {
    id: string;
    title?: string;
    create_time?: number | string;
    update_time?: number | string;
    projectId?: string;
    workspaceId?: string;
    scope: InventoryScope;
    sourceDetail?: string;
  }
): InventoryItem {
  const existing = map.get(item.id);
  if (existing) {
    if (!existing.scopes.includes(item.scope)) {
      existing.scopes.push(item.scope);
    }
    if (item.projectId && !existing.projectId) {
      existing.projectId = item.projectId;
    }
    if (item.workspaceId && !existing.workspaceId) {
      existing.workspaceId = item.workspaceId;
    }
    if (item.title && (!existing.title || existing.title === 'New chat' || existing.title === 'Bez názvu')) {
      existing.title = item.title;
    }
    if (item.update_time) {
      const existingTime = new Date(existing.update_time).getTime() || 0;
      const newTime = new Date(item.update_time).getTime() || 0;
      if (newTime > existingTime) {
        existing.update_time = item.update_time;
      }
    }
    if (item.sourceDetail && existing.sourceDetails && !existing.sourceDetails.includes(item.sourceDetail)) {
      existing.sourceDetails.push(item.sourceDetail);
    }
    return existing;
  }

  const created: InventoryItem = {
    id: item.id,
    title: item.title || '',
    create_time: item.create_time,
    update_time: item.update_time || Date.now(),
    projectId: item.projectId,
    workspaceId: item.workspaceId,
    scopes: [item.scope],
    sourceDetails: item.sourceDetail ? [item.sourceDetail] : [],
  };
  map.set(item.id, created);
  return created;
}

/**
 * Builds a complete conversation inventory across regular, project, and archived scopes.
 * Fail-safe: Error in one scope records the exact failure without dropping or stopping other scopes.
 */
export async function buildConversationInventory(
  options: BuildInventoryOptions = {}
): Promise<InventoryReport> {
  const {
    includeArchived = true,
    includeProjects = true,
    progressCb,
  } = options;

  const itemsMap = new Map<string, InventoryItem>();
  const errors: string[] = [];
  let isComplete = true;

  const scopes: {
    regular: ScopeInventoryResult;
    projects: ScopeInventoryResult;
    archived: ScopeInventoryResult;
  } = {
    regular: { scope: 'regular', status: 'ok', count: 0 },
    projects: { scope: 'project', status: 'ok', count: 0, subScopeDetails: {} },
    archived: { scope: 'archived', status: 'ok', count: 0 },
  };

  const discoveredGizmoIds = new Set<string>();

  // 1. Scope: REGULAR
  Logger.info('Inventory', 'Scanning regular conversations...');
  if (progressCb) progressCb('Skenování běžných konverzací...', itemsMap.size);

  let regularOffset = 0;
  const regularLimit = 100;

  while (true) {
    let page: any;
    try {
      page = await listConversationsPage({
        offset: regularOffset,
        limit: regularLimit,
        order: 'updated',
      });
    } catch (e: any) {
      const msg = `Chyba při čtení běžných konverzací (offset ${regularOffset}): ${e?.message || String(e)}`;
      Logger.error('Inventory', msg, e);
      scopes.regular.status = regularOffset > 0 ? 'partial' : 'failed';
      scopes.regular.error = msg;
      errors.push(msg);
      isComplete = false;
      break;
    }

    const items = Array.isArray(page?.items) ? page.items : [];
    if (items.length === 0) break;

    for (const it of items) {
      if (!it || !it.id) continue;
      const gid = it.conversation_template_id || it.gizmo_id || undefined;
      if (gid) discoveredGizmoIds.add(gid);

      mergeInventoryItem(itemsMap, {
        id: it.id,
        title: it.title,
        create_time: it.create_time,
        update_time: it.update_time,
        projectId: gid,
        workspaceId: it.workspace_id,
        scope: 'regular',
        sourceDetail: gid ? `regular:gizmo_${gid}` : 'regular:personal',
      });
      scopes.regular.count++;
    }

    if (progressCb) progressCb(`Běžné konverzace načteno: ${itemsMap.size}`, itemsMap.size);

    if (items.length < regularLimit) break;
    if (page?.total !== undefined && page?.total !== null && regularOffset + items.length >= page.total) {
      break;
    }

    regularOffset += regularLimit;
    await sleep(80);
  }

  // 2. Scope: PROJECTS (GIZMOS)
  if (includeProjects) {
    Logger.info('Inventory', 'Scanning project conversations (gizmos)...');
    if (progressCb) progressCb('Skenování projektových konverzací...', itemsMap.size);

    const projectIds = new Set<string>(discoveredGizmoIds);
    let sidebarCursor: string | null = null;
    let sidebarFailed = false;

    // 2a. Fetch all sidebar gizmos with pagination cursor
    do {
      let sidebar: any;
      try {
        sidebar = await listGizmosSidebar(sidebarCursor);
      } catch (e: any) {
        const msg = `Chyba při načítání postranního panelu gizmos (cursor: ${sidebarCursor}): ${e?.message || String(e)}`;
        Logger.error('Inventory', msg, e);
        scopes.projects.error = msg;
        errors.push(msg);
        isComplete = false;
        sidebarFailed = true;
        break;
      }

      if (sidebar?.gizmos && Array.isArray(sidebar.gizmos)) {
        for (const g of sidebar.gizmos) {
          if (g?.id) projectIds.add(g.id);
        }
      }
      if (sidebar?.items && Array.isArray(sidebar.items)) {
        for (const it of sidebar.items) {
          const gid = it?.gizmo?.gizmo?.id || it?.gizmo?.id;
          if (gid) projectIds.add(gid);
        }
      }

      sidebarCursor = sidebar && sidebar.cursor ? sidebar.cursor : null;
      if (sidebarCursor) await sleep(80);
    } while (sidebarCursor);

    // 2b. Fetch conversations for each project
    let projectsOkCount = 0;
    let projectsErrCount = 0;

    for (const pid of projectIds) {
      let cursor = 0;
      const limit = 50;
      let projectItemsCount = 0;
      let projectError: string | undefined;

      while (true) {
        let page: any;
        try {
          page = await listProjectConversations({ projectId: pid, cursor, limit });
        } catch (e: any) {
          projectError = `Chyba načítání konverzací projektu ${pid} (cursor ${cursor}): ${e?.message || String(e)}`;
          Logger.warn('Inventory', projectError, e);
          errors.push(projectError);
          isComplete = false;
          break; // Break this project only, proceed with other projects
        }

        const arr = Array.isArray(page?.items) ? page.items : [];
        if (arr.length === 0) break;

        for (const it of arr) {
          if (!it || !it.id) continue;
          mergeInventoryItem(itemsMap, {
            id: it.id,
            title: it.title,
            create_time: it.create_time,
            update_time: it.update_time,
            projectId: pid,
            scope: 'project',
            sourceDetail: `project:${pid}`,
          });
          scopes.projects.count++;
          projectItemsCount++;
        }

        if (progressCb) progressCb(`Projekt ${pid}: načteno ${projectItemsCount} chatů`, itemsMap.size);

        if (arr.length < limit) break;
        if (page?.total !== undefined && page?.total !== null && cursor + arr.length >= page.total) {
          break;
        }

        cursor += limit;
        await sleep(80);
      }

      if (scopes.projects.subScopeDetails) {
        scopes.projects.subScopeDetails[pid] = {
          count: projectItemsCount,
          error: projectError,
        };
      }

      if (projectError) {
        projectsErrCount++;
      } else {
        projectsOkCount++;
      }
    }

    if (sidebarFailed || projectsErrCount > 0) {
      scopes.projects.status = (projectsOkCount > 0 || scopes.projects.count > 0) ? 'partial' : 'failed';
    }
  }

  // 3. Scope: ARCHIVED
  if (includeArchived) {
    Logger.info('Inventory', 'Scanning archived conversations...');
    if (progressCb) progressCb('Skenování archivovaných konverzací...', itemsMap.size);

    let archOffset = 0;
    const archLimit = 100;

    while (true) {
      let page: any;
      try {
        page = await listConversationsPage({
          offset: archOffset,
          limit: archLimit,
          is_archived: true,
        });
      } catch (e: any) {
        const msg = `Chyba při čtení archivovaných konverzací (offset ${archOffset}): ${e?.message || String(e)}`;
        Logger.warn('Inventory', msg, e);
        scopes.archived.status = archOffset > 0 ? 'partial' : 'failed';
        scopes.archived.error = msg;
        errors.push(msg);
        isComplete = false;
        break;
      }

      const items = Array.isArray(page?.items) ? page.items : [];
      if (items.length === 0) break;

      for (const it of items) {
        if (!it || !it.id) continue;
        const gid = it.conversation_template_id || it.gizmo_id || undefined;
        mergeInventoryItem(itemsMap, {
          id: it.id,
          title: it.title,
          create_time: it.create_time,
          update_time: it.update_time,
          projectId: gid,
          workspaceId: it.workspace_id,
          scope: 'archived',
          sourceDetail: 'archived',
        });
        scopes.archived.count++;
      }

      if (progressCb) progressCb(`Archivované konverzace načteno: ${itemsMap.size}`, itemsMap.size);

      if (items.length < archLimit) break;
      if (page?.total !== undefined && page?.total !== null && archOffset + items.length >= page.total) {
        break;
      }

      archOffset += archLimit;
      await sleep(80);
    }
  }

  Logger.info('Inventory', `Inventory completed. Total unique conversations: ${itemsMap.size}, complete: ${isComplete}`);

  return {
    timestamp: Date.now(),
    complete: isComplete,
    items: Array.from(itemsMap.values()),
    scopes,
    errors,
  };
}
