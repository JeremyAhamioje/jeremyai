'use client'

import { lazy, Suspense } from 'react'
import WorkspaceShell from '@/components/layout/WorkspaceShell'
import { useAppStore } from '@/store'

// Lazy load all tool views
const ChatView = lazy(() => import('@/components/chat/ChatView'))
const ImageCompressor = lazy(() => import('@/components/tools/ImageCompressor'))
const PdfMerger = lazy(() => import('@/components/tools/PdfMerger'))
const DocxGenerator = lazy(() => import('@/components/tools/DocxGenerator'))
const FileConverter = lazy(() => import('@/components/tools/FileConverter'))

function ToolLoader() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-2 border-[rgba(124,106,247,0.2)] animate-spin" style={{ borderTopColor: '#7c6af7' }} />
        </div>
        <p className="text-xs text-[#555]">Loading…</p>
      </div>
    </div>
  )
}

function ActiveTool() {
  const { activeTool } = useAppStore()

  return (
    <Suspense fallback={<ToolLoader />}>
      {activeTool === 'chat'             && <ChatView />}
      {activeTool === 'image-compressor' && <ImageCompressor />}
      {activeTool === 'pdf-merger'       && <PdfMerger />}
      {activeTool === 'docx-generator'   && <DocxGenerator />}
      {activeTool === 'file-converter'   && <FileConverter />}
    </Suspense>
  )
}

export default function Page() {
  return (
    <WorkspaceShell>
      <ActiveTool />
    </WorkspaceShell>
  )
}
