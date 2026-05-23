// ── App navigation ────────────────────────────────────────────────────────────
export type ActiveTool =
  | 'chat'
  | 'image-compressor'
  | 'pdf-merger'
  | 'docx-generator'
  | 'file-converter'

// ── Chat types ────────────────────────────────────────────────────────────────
export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  attachments?: Attachment[]
}

export interface ChatSession {
  id: string
  title: string
  messages: ChatMessage[]
  createdAt: number
  updatedAt: number
}

export interface Attachment {
  name: string
  type: string
  size: number
  url?: string
  content?: string  // text content for PDFs/docs
}

// ── Tool types ─────────────────────────────────────────────────────────────────
export interface ToolFile {
  id: string
  name: string
  size: number
  type: string
  file: File
  preview?: string  // data URL for images
  status: 'idle' | 'processing' | 'done' | 'error'
  error?: string
  outputSize?: number
  outputUrl?: string
  outputName?: string
}

export interface CompressionOptions {
  quality: number       // 0-1
  maxWidth?: number
  maxHeight?: number
  format: 'jpeg' | 'png' | 'webp'
}

export interface DocxSection {
  id: string
  type: 'title' | 'heading1' | 'heading2' | 'paragraph' | 'bullet' | 'pagebreak'
  content: string
}

export interface ConversionJob {
  id: string
  inputFile: ToolFile
  operation: string
  status: 'idle' | 'processing' | 'done' | 'error'
  outputUrl?: string
  outputName?: string
  error?: string
}

// ── Sidebar history ────────────────────────────────────────────────────────────
export interface HistoryItem {
  id: string
  tool: ActiveTool
  label: string
  timestamp: number
  metadata?: Record<string, unknown>
}
