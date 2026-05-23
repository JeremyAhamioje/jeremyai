'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Upload, Download, X, FileText, GripVertical, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react'
import { formatBytes, generateId, cn } from '@/lib/utils'
import { useAppStore } from '@/store'

interface PFile { id:string; name:string; size:number; file:File }

export default function PdfMerger() {
  const [files, setFiles] = useState<PFile[]>([])
  const [merging, setMerging] = useState(false)
  const [resultUrl, setResultUrl] = useState<string|null>(null)
  const [error, setError] = useState<string|null>(null)
  const [dragging, setDragging] = useState(false)
  const [dragId, setDragId] = useState<string|null>(null)
  const [dragOver, setDragOver] = useState<string|null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { addHistory } = useAppStore()

  const add = useCallback((raw: FileList|File[]) => {
    const pdfs = Array.from(raw).filter(f=>f.type==='application/pdf')
    if (!pdfs.length) return
    setFiles(p => {
      const names = new Set(p.map(x=>x.name))
      return [...p, ...pdfs.filter(f=>!names.has(f.name)).map(f=>({id:generateId(),name:f.name,size:f.size,file:f}))]
    })
    setResultUrl(null); setError(null)
  }, [])

  const merge = async () => {
    if (files.length < 2) { setError('Add at least 2 PDFs'); return }
    setMerging(true); setError(null); setResultUrl(null)
    try {
      const { PDFDocument } = await import('pdf-lib')
      const merged = await PDFDocument.create()
      for (const pf of files) {
        const pdf = await PDFDocument.load(await pf.file.arrayBuffer())
        const pages = await merged.copyPages(pdf, pdf.getPageIndices())
        pages.forEach(p => merged.addPage(p))
      }
      const bytes = await merged.save()
      const blob = new Blob([bytes.buffer as ArrayBuffer], {type:'application/pdf'})
      setResultUrl(URL.createObjectURL(blob))
      addHistory({tool:'pdf-merger', label:`Merged ${files.length} PDFs (${formatBytes(blob.size)})`})
    } catch(e) {
      setError(e instanceof Error ? e.message : 'Merge failed — ensure PDFs are not password-protected')
    } finally { setMerging(false) }
  }

  const dl = () => { if (!resultUrl) return; const a=document.createElement('a'); a.href=resultUrl; a.download='merged.pdf'; a.click() }

  const onDrop = (targetId: string) => {
    if (!dragId || dragId===targetId) return
    setFiles(p => {
      const a=[...p], fi=a.findIndex(f=>f.id===dragId), ti=a.findIndex(f=>f.id===targetId)
      const [m]=a.splice(fi,1); a.splice(ti,0,m); return a
    })
    setDragId(null); setDragOver(null)
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border)] bg-[var(--surface)] flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl overflow-hidden border border-[var(--border)] flex-shrink-0 bg-[var(--surface-2)]">
            <Image src="https://res.cloudinary.com/dz6kxumoo/image/upload/v1778749488/Gemini_Generated_Image_69uwbm69uwbm69uw_j18t3r.png" alt="" width={36} height={36} className="w-full h-full object-cover" unoptimized/>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[var(--tx-1)]">PDF Merger</h2>
            <p className="text-xs text-[var(--tx-3)]">Combine multiple PDFs · drag to reorder</p>
          </div>
        </div>
        {files.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--tx-3)]">{files.length} files · {formatBytes(files.reduce((s,f)=>s+f.size,0))}</span>
            <button onClick={merge} disabled={merging||files.length<2} className="btn-primary btn-sm">
              {merging ? <RefreshCw size={13} className="anim-spin"/> : null} {merging?'Merging…':'Merge PDFs'}
            </button>
            {resultUrl && <button onClick={dl} className="btn-secondary btn-sm"><Download size={13}/>Download</button>}
            <button onClick={()=>{setFiles([]);setResultUrl(null);setError(null)}} className="btn-ghost btn-sm"><X size={13}/></button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        {/* Drop zone */}
        <div
          className={cn('drop-zone mb-5', dragging && 'active')}
          onDragOver={e=>{e.preventDefault();setDragging(true)}}
          onDragLeave={()=>setDragging(false)}
          onDrop={e=>{e.preventDefault();setDragging(false);add(e.dataTransfer.files)}}
          onClick={()=>inputRef.current?.click()}
        >
          <input ref={inputRef} type="file" multiple accept=".pdf,application/pdf" className="hidden" onChange={e=>e.target.files&&add(e.target.files)}/>
          <div className="w-11 h-11 rounded-xl bg-[var(--ac-subtle)] border border-[var(--ac-border)] flex items-center justify-center">
            <Upload size={20} className="text-[var(--ac-text)]"/>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-[var(--tx-1)]">Drop PDF files here or click to browse</p>
            <p className="text-xs text-[var(--tx-4)] mt-0.5">Add 2+ PDFs · Drag cards to reorder pages</p>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-[var(--red-bg)] border border-[rgba(192,57,43,0.18)] text-[var(--red)] text-sm">
            <AlertCircle size={14}/> {error}
          </div>
        )}

        {resultUrl && (
          <motion.div initial={{opacity:0,y:6}} animate={{opacity:1,y:0}}
            className="flex items-center gap-3 p-4 mb-4 rounded-xl bg-[var(--green-bg)] border border-[var(--green-border)]">
            <CheckCircle size={18} className="text-[var(--green)] flex-shrink-0"/>
            <div className="flex-1"><p className="text-sm font-medium text-[var(--green)]">Ready to download</p><p className="text-xs text-[var(--tx-3)]">merged.pdf</p></div>
            <button onClick={dl} className="btn-primary btn-sm"><Download size={13}/>Download</button>
          </motion.div>
        )}

        {files.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-[var(--tx-3)] mb-2">Drag to reorder — files will merge in this order</p>
            <AnimatePresence>
              {files.map((f, idx) => (
                <motion.div key={f.id} layout initial={{opacity:0,y:6}} animate={{opacity:1,y:0}}
                  draggable
                  onDragStart={()=>setDragId(f.id)}
                  onDragOver={e=>{e.preventDefault();setDragOver(f.id)}}
                  onDrop={e=>{e.preventDefault();onDrop(f.id)}}
                  onDragEnd={()=>{setDragId(null);setDragOver(null)}}
                  className={cn('card card-sm flex items-center gap-3 p-3 cursor-grab active:cursor-grabbing transition-all', dragOver===f.id && 'border-[var(--ac)] bg-[var(--ac-subtle)]', dragId===f.id && 'opacity-40')}
                >
                  <GripVertical size={15} className="text-[var(--tx-4)] flex-shrink-0"/>
                  <div className="w-8 h-8 rounded-lg bg-[var(--red-bg)] border border-[rgba(192,57,43,0.15)] flex items-center justify-center flex-shrink-0">
                    <FileText size={14} className="text-[var(--red)]"/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--tx-1)] truncate">{f.name}</p>
                    <p className="text-xs text-[var(--tx-4)]">{formatBytes(f.size)}</p>
                  </div>
                  <span className="w-6 h-6 rounded-full bg-[var(--surface-3)] text-[10px] text-[var(--tx-3)] flex items-center justify-center font-mono font-medium flex-shrink-0">{idx+1}</span>
                  <button onClick={()=>setFiles(p=>p.filter(x=>x.id!==f.id))} className="btn-ghost btn-xs p-1.5 rounded-md flex-shrink-0"><X size={13}/></button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}
