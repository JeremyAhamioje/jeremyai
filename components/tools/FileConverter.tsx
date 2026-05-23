'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Upload, Download, X, ArrowRight, RefreshCw, CheckCircle, AlertCircle, ArrowLeftRight } from 'lucide-react'
import { formatBytes, generateId, cn } from '@/lib/utils'
import { useAppStore } from '@/store'

type Mode = 'jpg-png'|'png-jpg'|'img-webp'|'webp-jpg'|'img-pdf'|'text-pdf'

interface ConvDef { id:Mode; from:string; to:string; label:string; accept:string; cat:string }

const CONVS: ConvDef[] = [
  {id:'jpg-png', from:'JPG',  to:'PNG',  label:'JPG → PNG',    accept:'image/jpeg',       cat:'Image'},
  {id:'png-jpg', from:'PNG',  to:'JPG',  label:'PNG → JPG',    accept:'image/png',         cat:'Image'},
  {id:'img-webp',from:'Image',to:'WebP', label:'Image → WebP', accept:'image/*',           cat:'Image'},
  {id:'webp-jpg',from:'WebP', to:'JPG',  label:'WebP → JPG',   accept:'image/webp',        cat:'Image'},
  {id:'img-pdf', from:'Image',to:'PDF',  label:'Image → PDF',  accept:'image/*',           cat:'Document'},
  {id:'text-pdf',from:'TXT',  to:'PDF',  label:'Text → PDF',   accept:'.txt,text/plain',   cat:'Document'},
]

interface Job {
  id:string; name:string; origSize:number; file:File
  status:'processing'|'done'|'error'; outputUrl?:string; outputName?:string; outputSize?:number; error?:string
}

async function convertImg(file:File, mime:'image/jpeg'|'image/png'|'image/webp', q=0.92): Promise<Blob> {
  return new Promise((res,rej)=>{
    const img=new window.Image()
    img.onload=()=>{
      const c=document.createElement('canvas')
      c.width=img.naturalWidth; c.height=img.naturalHeight
      const ctx=c.getContext('2d')!
      if (mime==='image/jpeg'){ctx.fillStyle='#fff';ctx.fillRect(0,0,c.width,c.height)}
      ctx.drawImage(img,0,0)
      c.toBlob(b=>b?res(b):rej(new Error('Failed')),mime,mime==='image/png'?undefined:q)
    }
    img.onerror=()=>rej(new Error('Cannot load image'))
    img.src=URL.createObjectURL(file)
  })
}

async function imgToPdf(file:File): Promise<Blob> {
  const {jsPDF}=await import('jspdf')
  const img=new window.Image()
  await new Promise((res,rej)=>{img.onload=res;img.onerror=rej;img.src=URL.createObjectURL(file)})
  const landscape=img.naturalWidth>img.naturalHeight
  const pdf=new jsPDF({orientation:landscape?'landscape':'portrait',unit:'px',format:[img.naturalWidth,img.naturalHeight]})
  const c=document.createElement('canvas'); c.width=img.naturalWidth; c.height=img.naturalHeight
  const ctx=c.getContext('2d')!; ctx.fillStyle='#fff'; ctx.fillRect(0,0,c.width,c.height); ctx.drawImage(img,0,0)
  const dims=pdf.internal.pageSize
  pdf.addImage(c.toDataURL('image/jpeg',0.95),'JPEG',0,0,dims.getWidth(),dims.getHeight())
  return new Blob([pdf.output('arraybuffer')],{type:'application/pdf'})
}

async function textToPdf(file:File): Promise<Blob> {
  const {jsPDF}=await import('jspdf')
  const text=await file.text()
  const pdf=new jsPDF({unit:'pt',format:'a4'})
  const m=40, lh=14, maxW=pdf.internal.pageSize.getWidth()-m*2
  const lines=pdf.splitTextToSize(text,maxW)
  pdf.setFont('helvetica','normal'); pdf.setFontSize(10)
  let y=m+10
  for (const line of lines){
    if(y>pdf.internal.pageSize.getHeight()-m){pdf.addPage();y=m+10}
    pdf.text(line,m,y); y+=lh
  }
  return new Blob([pdf.output('arraybuffer')],{type:'application/pdf'})
}

async function runConv(file:File, mode:Mode): Promise<{blob:Blob;ext:string}> {
  if(mode==='jpg-png')  return {blob:await convertImg(file,'image/png')          ,ext:'png'}
  if(mode==='png-jpg')  return {blob:await convertImg(file,'image/jpeg')         ,ext:'jpg'}
  if(mode==='img-webp') return {blob:await convertImg(file,'image/webp')         ,ext:'webp'}
  if(mode==='webp-jpg') return {blob:await convertImg(file,'image/jpeg')         ,ext:'jpg'}
  if(mode==='img-pdf')  return {blob:await imgToPdf(file)                        ,ext:'pdf'}
  if(mode==='text-pdf') return {blob:await textToPdf(file)                       ,ext:'pdf'}
  throw new Error('Unknown mode')
}

export default function FileConverter() {
  const [mode, setMode] = useState<Mode>('jpg-png')
  const [jobs, setJobs] = useState<Job[]>([])
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { addHistory } = useAppStore()
  const cur = CONVS.find(c=>c.id===mode)!
  const cats = [...new Set(CONVS.map(c=>c.cat))]

  const process = useCallback(async (raw:FileList|File[]) => {
    const arr = Array.from(raw); if(!arr.length) return
    const newJobs: Job[] = arr.map(f=>({id:generateId(),name:f.name,origSize:f.size,file:f,status:'processing'}))
    setJobs(p=>[...newJobs,...p])
    for (const job of newJobs){
      try {
        const {blob,ext}=await runConv(job.file,mode)
        const url=URL.createObjectURL(blob)
        const base=job.name.replace(/\.[^.]+$/,'')
        setJobs(p=>p.map(j=>j.id===job.id?{...j,status:'done',outputUrl:url,outputName:`${base}.${ext}`,outputSize:blob.size}:j))
        addHistory({tool:'file-converter',label:`${job.name} → .${ext}`})
      } catch(e){
        setJobs(p=>p.map(j=>j.id===job.id?{...j,status:'error',error:e instanceof Error?e.message:'Failed'}:j))
      }
    }
  },[mode,addHistory])

  const dl = (j:Job)=>{ if(!j.outputUrl||!j.outputName) return; const a=document.createElement('a'); a.href=j.outputUrl; a.download=j.outputName; a.click() }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border)] bg-[var(--surface)] flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl overflow-hidden border border-[var(--border)] flex-shrink-0 bg-[var(--surface-2)]">
            <Image src="https://res.cloudinary.com/dz6kxumoo/image/upload/v1778749488/Gemini_Generated_Image_69uwbm69uwbm69uw_j18t3r.png" alt="" width={36} height={36} className="w-full h-full object-cover" unoptimized/>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[var(--tx-1)]">File Converter</h2>
            <p className="text-xs text-[var(--tx-3)]">Convert between formats — runs in your browser</p>
          </div>
        </div>
        {jobs.length > 0 && (
          <div className="flex items-center gap-2">
            <button onClick={()=>jobs.filter(j=>j.status==='done').forEach(dl)} className="btn-primary btn-sm">
              <Download size={13}/> Download All
            </button>
            <button onClick={()=>setJobs([])} className="btn-ghost btn-sm"><X size={13}/></button>
          </div>
        )}
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Mode picker */}
        <div className="w-48 flex-shrink-0 border-r border-[var(--border)] p-3 overflow-y-auto bg-[var(--bg-subtle)]">
          {cats.map(cat=>(
            <div key={cat} className="mb-3">
              <p className="section-label px-1 mb-1.5">{cat}</p>
              {CONVS.filter(c=>c.cat===cat).map(c=>(
                <button key={c.id} onClick={()=>{setMode(c.id);setJobs([])}}
                  className={cn('w-full flex items-center justify-between px-2.5 py-2 rounded-[var(--r-md)] text-sm mb-0.5 transition-all',
                    mode===c.id ? 'bg-[var(--ac-subtle)] text-[var(--tx-1)]' : 'text-[var(--tx-3)] hover:bg-[var(--surface-2)] hover:text-[var(--tx-1)]'
                  )}>
                  <span className="text-xs font-medium">{c.label}</span>
                  {mode===c.id && <span className="w-1.5 h-1.5 rounded-full bg-[var(--ac)] flex-shrink-0"/>}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Main */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* Mode indicator */}
          <div className="flex items-center gap-3 mb-5 p-3.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl">
            <span className="badge-purple font-mono">.{cur.from.toLowerCase()}</span>
            <ArrowLeftRight size={14} className="text-[var(--tx-4)]"/>
            <span className="badge-green font-mono">.{cur.to.toLowerCase()}</span>
            <div className="h-4 w-px bg-[var(--border)] mx-1"/>
            <p className="text-xs text-[var(--tx-3)]">Conversion runs locally — files never leave your device</p>
          </div>

          {/* Drop zone */}
          <div
            className={cn('drop-zone mb-5', dragging && 'active')}
            onDragOver={e=>{e.preventDefault();setDragging(true)}}
            onDragLeave={()=>setDragging(false)}
            onDrop={e=>{e.preventDefault();setDragging(false);process(e.dataTransfer.files)}}
            onClick={()=>inputRef.current?.click()}
          >
            <input ref={inputRef} type="file" multiple accept={cur.accept} className="hidden" onChange={e=>e.target.files&&process(e.target.files)}/>
            <div className="w-11 h-11 rounded-xl bg-[var(--ac-subtle)] border border-[var(--ac-border)] flex items-center justify-center">
              <Upload size={20} className="text-[var(--ac-text)]"/>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-[var(--tx-1)]">Drop {cur.from} files or click to browse</p>
              <p className="text-xs text-[var(--tx-4)] mt-0.5">Converts to {cur.to} · batch supported</p>
            </div>
          </div>

          {/* Job list */}
          <AnimatePresence>
            {jobs.map(j=>(
              <motion.div key={j.id} layout initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={{opacity:0,scale:0.97}}
                className="card card-sm flex items-center gap-3 p-3 mb-2">
                <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0',
                  j.status==='done'?'bg-[var(--green-bg)]':j.status==='error'?'bg-[var(--red-bg)]':'bg-[var(--ac-subtle)]'
                )}>
                  {j.status==='done'&&<CheckCircle size={16} className="text-[var(--green)]"/>}
                  {j.status==='error'&&<AlertCircle size={16} className="text-[var(--red)]"/>}
                  {j.status==='processing'&&<RefreshCw size={16} className="text-[var(--ac)] anim-spin"/>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--tx-1)] truncate">{j.name}</p>
                  {j.status==='processing'&&<p className="text-xs text-[var(--tx-4)] mt-0.5">Converting…</p>}
                  {j.status==='done'&&j.outputName&&(
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-xs text-[var(--tx-4)]">{formatBytes(j.origSize)}</span>
                      <ArrowRight size={10} className="text-[var(--tx-4)]"/>
                      <span className="text-xs text-[var(--green)] font-medium">{j.outputName}</span>
                      {j.outputSize&&<span className="text-xs text-[var(--tx-4)]">· {formatBytes(j.outputSize)}</span>}
                    </div>
                  )}
                  {j.status==='error'&&<p className="text-xs text-[var(--red)] mt-0.5">{j.error}</p>}
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {j.status==='done'&&<button onClick={()=>dl(j)} className="btn-secondary btn-sm"><Download size={12}/>Save</button>}
                  <button onClick={()=>setJobs(p=>p.filter(x=>x.id!==j.id))} className="btn-ghost btn-xs p-1.5 rounded-md"><X size={13}/></button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
