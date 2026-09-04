import { pointerToFileId, normalizeSandboxPointer, resolveSedimentPointer } from './utils';
import { Conversation, FileCandidate, Message } from './types';

export function collectFileCandidates(conv: Conversation): FileCandidate[] {
  const mapping = (conv && conv.mapping) || {};
  const out = new Map<string, FileCandidate>();
  const convId = conv?.conversation_id || '';
  const gizmoId = conv?.gizmo_id || null;

  const add = (fileId: string, info: Partial<FileCandidate>) => {
    if (!fileId) return;
    if (out.has(fileId)) return;
    out.set(fileId, { file_id: fileId, conversation_id: convId, gizmo_id: gizmoId, ...info });
  };

  for (const key in mapping) {
    const node = mapping[key];
    if (!node || !node.message) continue;
    const msg = node.message as Message;
    const meta = msg.metadata || {};
    const c = msg.content || {};

    (meta.attachments || []).forEach((att) => {
      if (!att) return;
      const rawUrl = att.download_url || att.url;
      const cleanUrl = (rawUrl && typeof rawUrl === 'string' && (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')))
        ? rawUrl
        : undefined;

      let sedimentId: string | null = null;
      if (rawUrl && typeof rawUrl === 'string' && rawUrl.startsWith('sediment://')) {
        sedimentId = resolveSedimentPointer(rawUrl);
      }

      const cleanAttId = (att.id && typeof att.id === 'string') ? pointerToFileId(att.id) : att.id;
      const cleanFileId = (att.file_id && typeof att.file_id === 'string') ? pointerToFileId(att.file_id) : att.file_id;
      const cleanLibId = (att.library_file_id && typeof att.library_file_id === 'string') ? pointerToFileId(att.library_file_id) : att.library_file_id;

      // Prefer file_ id starting with file- or file_, or library_file_id, or att.id, or sedimentId
      const primaryId = (cleanAttId && (cleanAttId.startsWith('file-') || cleanAttId.startsWith('file_')))
        ? cleanAttId
        : (cleanLibId || cleanFileId || sedimentId || cleanAttId);
      if (!primaryId) return;

      add(primaryId, {
        source: 'attachment',
        candidate_type: 'attachment',
        meta: att,
        message_id: msg.id,
        library_file_id: cleanLibId || null,
        name: att.name || att.file_name,
        mime_type: att.mime_type || att.mime,
        size_bytes: att.size || att.size_bytes,
        download_url: cleanUrl,
      });
    });

    const crefByFile = meta.content_references_by_file || {};
    Object.values(crefByFile)
      .flat()
      .forEach((ref) => {
        if (ref?.file_id) add(pointerToFileId(ref.file_id), { source: 'cref', candidate_type: 'cref', meta: ref, message_id: msg.id });
        if (ref?.asset_pointer) {
          const fid = pointerToFileId(ref.asset_pointer);
          add(fid, { source: 'cref-pointer', candidate_type: 'cref-pointer', pointer: ref.asset_pointer, meta: ref, message_id: msg.id });
        }
      });

    const n7 = meta.n7jupd_crefs_by_file || meta.n7jupd_crefs || {};
    const n7list = Array.isArray(n7) ? n7 : Object.values(n7).flat();
    n7list.forEach((ref) => {
      if (ref?.file_id) add(pointerToFileId(ref.file_id), { source: 'n7jupd-cref', candidate_type: 'n7jupd-cref', meta: ref, message_id: msg.id });
    });

    if (Array.isArray(c.parts)) {
      c.parts.forEach((part) => {
        if (part && typeof part === 'object' && part.content_type && part.asset_pointer) {
          const fid = pointerToFileId(part.asset_pointer);
          add(fid, { source: part.content_type, candidate_type: part.content_type, pointer: part.asset_pointer, meta: part, message_id: msg.id });
        }
        if (part && typeof part === 'object' && part.audio_asset_pointer && part.audio_asset_pointer.asset_pointer) {
          const ap = part.audio_asset_pointer;
          const fid = pointerToFileId(ap.asset_pointer);
          add(fid, { source: 'voice-audio', candidate_type: 'voice-audio', pointer: ap.asset_pointer, meta: ap, message_id: msg.id });
        }
      });
    }

    if (c.content_type === 'text' && Array.isArray(c.parts)) {
      c.parts.forEach((txt) => {
        if (typeof txt !== 'string') return;
        const matches = txt.match(/\{\{file:([^}]+)\}\}/g) || [];
        matches.forEach((tok) => {
          const fid = tok.slice(7, -2);
          add(fid, { source: 'inline-placeholder', candidate_type: 'inline-placeholder', message_id: msg.id });
        });
        const sandboxLinks = txt.match(/sandbox:[^\s\)]+/g) || [];
        sandboxLinks.forEach((s) => {
          const cleanS = normalizeSandboxPointer(s);
          if (cleanS) {
            add(cleanS, { source: 'sandbox-link', candidate_type: 'sandbox-link', pointer: cleanS, message_id: msg.id });
          }
        });
      });
    }
  }
  return [...out.values()];
}

export function extractImages(conv: Conversation): FileCandidate[] {
  const mapping = conv && conv.mapping ? conv.mapping : {};
  const images: FileCandidate[] = [];
  const seen = new Set<string>();

  for (const key in mapping) {
    const node = mapping[key];
    if (!node || !node.message) continue;
    const msg = node.message as Message;
    const role = msg.author && msg.author.role;
    const msgId = msg.id;

    const meta = msg.metadata || {};
    if (Array.isArray(meta.attachments)) {
      for (const att of meta.attachments) {
        if (!att || !att.id) continue;
        const fileId = att.id;
        if (seen.has(fileId)) continue;
        seen.add(fileId);
        images.push({
          kind: 'attachment',
          file_id: fileId,
          gizmo_id: conv.gizmo_id || null,
          name: att.name || '',
          mime_type: att.mime_type || '',
          size_bytes: att.size || att.size_bytes || undefined,
          message_id: msgId,
          role,
          source: 'upload',
        });
      }
    }

    const c = msg.content;
    if (c && c.content_type === 'multimodal_text' && Array.isArray(c.parts)) {
      for (const part of c.parts) {
        if (part && typeof part === 'object' && part.content_type === 'image_asset_pointer') {
          const pointer = part.asset_pointer || '';
          let fileId = '';
          if (pointer.startsWith('sediment://')) {
            const resolved = resolveSedimentPointer(pointer);
            if (resolved) fileId = resolved;
          }
          if (!fileId) {
            const m = pointer.match(/file[-_][0-9a-f]+/i);
            if (m) fileId = m[0];
          }
          const keyId = fileId || pointer;
          if (seen.has(keyId)) continue;
          seen.add(keyId);
          images.push({
            kind: 'asset_pointer',
            file_id: fileId,
            gizmo_id: conv.gizmo_id || null,
            pointer,
            width: part.width,
            height: part.height,
            size_bytes: part.size_bytes,
            message_id: msgId,
            role,
            source: 'asset_pointer',
          });
        }
      }
    }
  }

  console.log('[ChatGPT-Multimodal-Exporter] Nalezené informace o obrázcích: ', images);
  return images;
}
