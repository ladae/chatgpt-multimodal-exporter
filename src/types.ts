export interface Conversation {
  title: string;
  create_time: number;
  update_time: number;
  mapping: Record<string, ConversationNode>;
  moderation_results: any[];
  current_node: string;
  plugin_ids: string[] | null;
  conversation_id: string;
  conversation_template_id: string | null;
  gizmo_id: string | null;
  is_archived: boolean;
  safe_urls: string[];
  default_model_slug: string;
  workspace_id?: string;
}

export interface ConversationNode {
  id: string;
  message?: Message | null;
  parent?: string | null;
  children: string[];
}

export interface Message {
  id: string;
  author: {
    role: string;
    name?: string | null;
    metadata?: any;
  };
  create_time: number | null;
  update_time: number | null;
  content: MessageContent;
  status: string;
  end_turn: boolean | null;
  weight: number;
  metadata: MessageMetadata;
  recipient: string;
}

export type ThoughtItem = string | { text?: string; content?: string };

export interface MessageContent {
  content_type: string;
  parts?: any[];
  text?: string; // Legacy or simple text
  content?: string; // reasoning recap payloads
  thoughts?: ThoughtItem[] | string; // reasoning payloads
}

export interface MessageMetadata {
  attachments?: Attachment[];
  content_references_by_file?: Record<string, any[]>; // file_id -> refs
  n7jupd_crefs_by_file?: Record<string, any[]> | any[]; // Obfuscated field
  n7jupd_crefs?: Record<string, any[]> | any[]; // Obfuscated field
  [key: string]: any;
}

export interface Attachment {
  id: string;
  name: string;
  mime_type: string;
  size?: number;
  size_bytes?: number;
  width?: number;
  height?: number;
  [key: string]: any;
}

export interface FileCandidate {
  file_id: string;
  conversation_id?: string;
  project_id?: string;
  message_id?: string;
  pointer?: string;
  source?: string;
  meta?: any;
  kind?: string;
  name?: string;
  mime_type?: string;
  size_bytes?: number;
  width?: number;
  height?: number;
  role?: string;
  gizmo_id?: string | null;
  library_file_id?: string | null;
  candidate_type?: string;
  download_url?: string;
}

export interface Project {
  projectId: string;
  projectName: string;
  createdAt?: string;
  convs: { id: string; title: string }[];
}

export interface Task {
  id: string;
  projectId: string | null;
}

export interface BatchExportSummary {
  exported_at: string;
  total_conversations: number;
  root: { count: number; ids: string[] };
  projects: {
    projectId: string;
    projectName: string;
    createdAt: string;
    count: number;
  }[];
  failed: {
    conversations: any[];
    attachments: any[];
  };
}

export interface ConversationMetadata {
  id: string;
  title: string;
  create_time: number;
  update_time: number;
  model_slug: string;
  attachments: {
    pointer: string;
    file_id: string;
    original_name: string;
    saved_as: string;
    size_bytes: number | null;
    mime: string;
    source: string;
    library_file_id?: string | null;
    download_method?: string;
  }[];
  failed_attachments: {
    pointer?: string;
    file_id?: string;
    library_file_id?: string | null;
    original_name?: string;
    source?: string;
    candidate_type?: string;
    message_id?: string;
    download_method?: string;
    error: string;
    http_status?: number | null;
  }[];
  asset_ledger?: AssetLedgerEntry[];
}

export interface DownloadResult {
  ok: number;
  total: number;
}

export interface UserProfile {
  object: string;
  id: string;
  email: string;
  name: string;
  picture: string | null;
  created: number;
  phone_number: string | null;
  mfa_flag_enabled: boolean;
  email_domain_type?: string;
  orgs?: {
    object: string;
    data: any[];
  };
}

export type InventoryScope = 'regular' | 'project' | 'archived';

export interface InventoryItem {
  id: string; // conversation_id
  title: string;
  create_time?: number | string;
  update_time: number | string;
  projectId?: string;
  workspaceId?: string;
  scopes: InventoryScope[];
  sourceDetails?: string[];
}

export interface ScopeInventoryResult {
  scope: InventoryScope;
  status: 'ok' | 'failed' | 'partial';
  count: number;
  error?: string;
  subScopeDetails?: Record<string, { count: number; error?: string }>;
}

export interface InventoryReport {
  timestamp: number;
  complete: boolean;
  items: InventoryItem[];
  scopes: {
    regular: ScopeInventoryResult;
    projects: ScopeInventoryResult;
    archived: ScopeInventoryResult;
  };
  errors: string[];
}

export interface AssetLedgerEntry {
  conversation_id: string;
  message_id: string | null;
  candidate_type: string;
  file_id: string | null;
  library_file_id: string | null;
  original_ref: string | null;
  download_method: string;
  status: 'success' | 'failure';
  error: string | null;
  http_status: number | null;
  local_path: string | null;
  size_bytes: number | null;
  mime_type: string | null;
  timestamp: number;
}

export type ScanValidationStatus =
  | 'COMPLETE'
  | 'COMPLETE_WITH_ASSET_ERRORS'
  | 'INCOMPLETE_INVENTORY'
  | 'INCOMPLETE_CONVERSATIONS'
  | 'FAILED';

export interface ScanReport {
  status: ScanValidationStatus;
  timestamp: number;
  scan_mode: 'full' | 'incremental';
  inventory: {
    total_found: number;
    complete: boolean;
    scopes: {
      regular: ScopeInventoryResult;
      projects: ScopeInventoryResult;
      archived: ScopeInventoryResult;
    };
    errors: string[];
  };
  conversations: {
    expected_conversation_ids: string[];
    saved_conversation_ids: string[];
    failed_conversation_ids: string[];
    missing_conversation_ids: string[];
    details: {
      conversation_id: string;
      title: string;
      scope: InventoryScope[];
      status: 'saved' | 'failed' | 'missing';
      error?: string;
      asset_count?: number;
      failed_assets?: number;
    }[];
  };
  assets: {
    total_candidate_assets: number;
    saved_candidate_assets: number;
    failed_candidate_assets: number;
    total_download_attempts: number;
    failed_download_attempts: number;
    total_candidates: number;
    saved_count: number;
    failed_count: number;
    ledger: AssetLedgerEntry[];
  };
}

// Runtime stubs for declaration merging (ensures ESM runtimes can import without error)
export const Conversation = {};
export const ConversationNode = {};
export const Message = {};
export const MessageContent = {};
export const MessageMetadata = {};
export const Attachment = {};
export const FileCandidate = {};
export const Project = {};
export const Task = {};
export const BatchExportSummary = {};
export const ConversationMetadata = {};
export const DownloadResult = {};
export const UserProfile = {};
export const InventoryItem = {};
export const ScopeInventoryResult = {};
export const InventoryReport = {};
export const AssetLedgerEntry = {};
export const ScanReport = {};

