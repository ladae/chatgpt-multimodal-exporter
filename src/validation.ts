import type {
  ScanValidationStatus,
  ScanReport,
  InventoryReport,
  AssetLedgerEntry,
  InventoryScope,
} from './types';
import { writeFile } from './fileSystem';
import { Logger } from './logger';

export interface EvaluateValidationInput {
  inventoryReport: InventoryReport;
  expectedIds: string[];
  savedIds: string[];
  failedIds: string[];
  missingIds: string[];
  totalAssets: number;
  failedAssets: number;
  unhandledException?: any;
}

/**
 * Pure evaluation function for fail-closed validation.
 * Implements the 5 strict outcome statuses required by specification:
 * - COMPLETE
 * - COMPLETE_WITH_ASSET_ERRORS
 * - INCOMPLETE_INVENTORY
 * - INCOMPLETE_CONVERSATIONS
 * - FAILED
 */
export function evaluateValidationStatus(input: EvaluateValidationInput): ScanValidationStatus {
  if (input.unhandledException) {
    return 'FAILED';
  }

  if (!input.inventoryReport.complete) {
    return 'INCOMPLETE_INVENTORY';
  }

  if (input.failedIds.length > 0 || input.missingIds.length > 0) {
    return 'INCOMPLETE_CONVERSATIONS';
  }

  if (input.failedAssets > 0) {
    return 'COMPLETE_WITH_ASSET_ERRORS';
  }

  return 'COMPLETE';
}

export interface BuildScanReportParams {
  scanMode: 'full' | 'incremental';
  inventoryReport: InventoryReport;
  expectedIds: string[];
  savedIds: string[];
  failedIds: string[];
  missingIds: string[];
  chatDetails: {
    conversation_id: string;
    title: string;
    scope: InventoryScope[];
    status: 'saved' | 'failed' | 'missing';
    error?: string;
    asset_count?: number;
    failed_assets?: number;
  }[];
  assetLedger: AssetLedgerEntry[];
  unhandledException?: any;
}

export interface AssetLedgerSummary {
  total_candidate_assets: number;
  saved_candidate_assets: number;
  failed_candidate_assets: number;
  total_download_attempts: number;
  failed_download_attempts: number;
}

export function computeAssetLedgerSummary(ledger: AssetLedgerEntry[]): AssetLedgerSummary {
  const candidateStatus = new Map<string, boolean>();

  for (const entry of ledger) {
    const key = `${entry.conversation_id}|${entry.message_id || ''}|${entry.candidate_type || ''}|${entry.original_ref || entry.file_id || ''}`;
    if (entry.status === 'success') {
      candidateStatus.set(key, true);
    } else if (!candidateStatus.has(key)) {
      candidateStatus.set(key, false);
    }
  }

  let savedCandidates = 0;
  let failedCandidates = 0;

  for (const isSaved of candidateStatus.values()) {
    if (isSaved) {
      savedCandidates++;
    } else {
      failedCandidates++;
    }
  }

  return {
    total_candidate_assets: candidateStatus.size,
    saved_candidate_assets: savedCandidates,
    failed_candidate_assets: failedCandidates,
    total_download_attempts: ledger.length,
    failed_download_attempts: ledger.filter((e) => e.status === 'failure').length,
  };
}

export function buildScanReport(params: BuildScanReportParams): ScanReport {
  const summary = computeAssetLedgerSummary(params.assetLedger);

  const status = evaluateValidationStatus({
    inventoryReport: params.inventoryReport,
    expectedIds: params.expectedIds,
    savedIds: params.savedIds,
    failedIds: params.failedIds,
    missingIds: params.missingIds,
    totalAssets: summary.total_candidate_assets,
    failedAssets: summary.failed_candidate_assets,
    unhandledException: params.unhandledException,
  });

  return {
    status,
    timestamp: Date.now(),
    scan_mode: params.scanMode,
    inventory: {
      total_found: params.inventoryReport.items.length,
      complete: params.inventoryReport.complete,
      scopes: params.inventoryReport.scopes,
      errors: params.inventoryReport.errors,
    },
    conversations: {
      expected_conversation_ids: params.expectedIds,
      saved_conversation_ids: params.savedIds,
      failed_conversation_ids: params.failedIds,
      missing_conversation_ids: params.missingIds,
      details: params.chatDetails,
    },
    assets: {
      total_candidate_assets: summary.total_candidate_assets,
      saved_candidate_assets: summary.saved_candidate_assets,
      failed_candidate_assets: summary.failed_candidate_assets,
      total_download_attempts: summary.total_download_attempts,
      failed_download_attempts: summary.failed_download_attempts,
      total_candidates: summary.total_candidate_assets,
      saved_count: summary.saved_candidate_assets,
      failed_count: summary.failed_candidate_assets,
      ledger: params.assetLedger,
    },
  };
}

export async function saveScanReport(
  userFolder: FileSystemDirectoryHandle,
  report: ScanReport
): Promise<void> {
  try {
    const filename = 'scan_report.json';
    await writeFile(userFolder, filename, JSON.stringify(report, null, 2));
    Logger.info('Validation', `Scan report saved to disk: ${filename} (status: ${report.status})`);
  } catch (e) {
    Logger.error('Validation', 'Failed to save scan report to disk', e);
  }
}
