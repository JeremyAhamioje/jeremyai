'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Upload, Download, X, RefreshCw, CheckCircle, AlertCircle, SlidersHorizontal } from 'lucide-react'
import { formatBytes, savingsPercent, generateId, cn } from '@/lib/utils'
import { useAppStore } from '@/store'

interface CFile {
  id: string; name: string; origSize: number; compSize: number
  origUrl: string; compUrl: string; format: 'jpeg'|'png'|'webp'
  status: 'processing'|'done'|'error'; error?: string
}

async function compress(file: File, q: number, fmt: 'jpeg'|'png'|'webp', maxDim: number): Promise<{blob:Blob;url:string}> {
  return new Promise((res, rej) => {
    const img = new window.Image()
    img.onload = () => {
      let {width:w, height:h} = img
      if (w > maxDim || h > maxDim) { const r = Math.min(maxDim/w, maxDim/h); w=Math.round(w*r); h=Math.round(h*r) }
      const canvas = document.createElement('canvas')
      canvas.width=w; canvas.height=h
      const ctx = canvas.getContext('2d')!
      if (fmt === 'jpeg') { ctx.fillStyle='#fff'; ctx.fillRect(0,0,w,h) }
      ctx.drawImage(img,0,0,w,h)
      const mime = fmt==='jpeg'?'image/jpeg':fmt==='png'?'image/png':'image/webp'
      canvas.toBlob(blob => blob ? res({blob, url: URL.createObjectURL(blob)}) : rej(new Error('Failed')), mime, fmt==='png'?undefined:q)
    }
    img.onerror = () => rej(new Error('Could not load image'))
    img.src = URL.createObjectURL(file)
  })
}

export default function ImageCompressor() {
  const [files, setFiles] = useState<CFile[]>([])
  const [quality, setQuality] = useState(80)
  const [format, setFormat] = useState<'jpeg'|'png'|'webp'>('jpeg')
  const [maxDim, setMaxDim] = useState(4096)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { addHistory } = useAppStore()

  const process = useCallback(async (raw: FileList|File[]) => {
    const imgs = Array.from(raw).filter(f => f.type.startsWith('image/'))
    if (!imgs.length) return
    const placeholders: CFile[] = imgs.map(f => ({
      id: generateId(), name: f.name, origSize: f.size, compSize: 0,
      origUrl: URL.createObjectURL(f), compUrl: '', format, status: 'processing',
    }))
    setFiles(p => [...placeholders, ...p])
    for (let i=0; i<imgs.length; i++) {
      const ph = placeholders[i]
      try {
        const {blob, url} = await compress(imgs[i], quality/100, format, maxDim)
        setFiles(p => p.map(f => f.id===ph.id ? {...f,compSize:blob.size,compUrl:url,status:'done'} : f))
        addHistory({ tool:'image-compressor', label:`${imgs[i].name} → ${formatBytes(blob.size)}` })
      } catch(e) {
        setFiles(p => p.map(f => f.id===ph.id ? {...f,status:'error',error:e instanceof Error?e.message:'Failed'} : f))
      }
    }
  }, [quality, format, maxDim, addHistory])

  const dl = (f: CFile) => { const a=document.createElement('a'); a.href=f.compUrl; a.download=`compressed_${f.name.replace(/\.[^.]+$/,'')}.${f.format}`; a.click() }
  const savings = files.filter(f=>f.status==='done').reduce((a,f)=>({o:a.o+f.origSize,c:a.c+f.compSize}),{o:0,c:0})

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border)] bg-[var(--surface)] flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl overflow-hidden border border-[var(--border)] flex-shrink-0 bg-[var(--surface-2)]">
            <Image src="https://res.cloudinary.com/dz6kxumoo/image/upload/v1778749490/Gemini_Generated_Image_ru26ceru26ceru26_eshv6a.png" alt="" width={36} height={36} className="w-full h-full object-cover" unoptimized />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[var(--tx-1)]">Image Compressor</h2>
            <p className="text-xs text-[var(--tx-3)]">Reduce file size without losing quality</p>
          </div>
        </div>
        {files.length > 0 && (
          <div className="flex items-center gap-2">
            {savings.o > 0 && <span className="badge-green">Saved {savingsPercent(savings.o, savings.c)}</span>}
            <button onClick={() => files.filter(f=>f.status==='done').forEach(dl)} className="btn-primary btn-sm">
              <Download size={13}/> Download All
            </button>
            <button onClick={() => setFiles([])} className="btn-secondary btn-sm">Clear</button>
          </div>
        )}
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Settings */}
        <div className="w-56 flex-shrink-0 border-r border-[var(--border)] p-4 space-y-5 overflow-y-auto bg-[var(--bg-subtle)]">
          <div>
            <p className="section-label mb-3 flex items-center gap-1.5"><SlidersHorizontal size={11}/>Settings</p>
            <label className="block mb-4">
              <div className="flex justify-between mb-1.5">
                <span className="text-xs text-[var(--tx-2)]">Quality</span>
                <span className="text-xs font-mono font-semibold text-[var(--ac-text)]">{quality}%</span>
              </div>
              <input type="range" min={10} max={100} value={quality} onChange={e=>setQuality(+e.target.value)} className="w-full accent-[var(--ac)] cursor-pointer" />
              <div className="flex justify-between text-[10px] text-[var(--tx-4)] mt-1"><span>Smaller</span><span>Better quality</span></div>
            </label>
            <label className="block mb-4">
              <span className="text-xs text-[var(--tx-2)] block mb-1.5">Output Format</span>
              <div className="grid grid-cols-3 gap-1">
                {(['jpeg','png','webp'] as const).map(f => (
                  <button key={f} onClick={()=>setFormat(f)} className={cn('py-1.5 rounded-md text-xs font-medium transition-all border', format===f ? 'bg-[var(--ac-subtle)] text-[var(--ac-text)] border-[var(--ac-border)]' : 'bg-[var(--surface)] text-[var(--tx-3)] border-[var(--border)] hover:border-[var(--border-med)]')}>{f.toUpperCase()}</button>
                ))}
              </div>
            </label>
            <label className="block">
              <span className="text-xs text-[var(--tx-2)] block mb-1.5">Max Dimension</span>
              <select value={maxDim} onChange={e=>setMaxDim(+e.target.value)} className="input text-xs py-1.5">
                <option value={1280}>1280px</option>
                <option value={1920}>1920px (FHD)</option>
                <option value={2560}>2560px (QHD)</option>
                <option value={4096}>Original size</option>
              </select>
            </label>
          </div>
          <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--tx-4)] space-y-1.5">
            <p className="font-medium text-[var(--tx-3)]">Format guide</p>
            <p>JPEG — best for photos</p>
            <p>PNG — logos & transparency</p>
            <p>WebP — smallest output</p>
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 overflow-y-auto p-5">
          <div
            className={cn('drop-zone mb-5', dragging && 'active')}
            onDragOver={e=>{e.preventDefault();setDragging(true)}}
            onDragLeave={()=>setDragging(false)}
            onDrop={e=>{e.preventDefault();setDragging(false);process(e.dataTransfer.files)}}
            onClick={()=>inputRef.current?.click()}
          >
            <input ref={inputRef} type="file" multiple accept="image/*" className="hidden" onChange={e=>e.target.files&&process(e.target.files)}/>
            <div className="w-11 h-11 rounded-xl bg-[var(--ac-subtle)] border border-[var(--ac-border)] flex items-center justify-center">
              <Upload size={20} className="text-[var(--ac-text)]"/>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-[var(--tx-1)]">Drop images here or click to browse</p>
              <p className="text-xs text-[var(--tx-4)] mt-0.5">JPG, PNG, WebP, GIF · Batch supported</p>
            </div>
          </div>

          <AnimatePresence>
            {files.map(f => (
              <motion.div key={f.id} layout initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} className="card card-sm flex items-center gap-3 p-3 mb-2">
                <div className="w-11 h-11 rounded-lg overflow-hidden bg-[var(--surface-2)] flex-shrink-0 border border-[var(--border)]">
                  {f.origUrl && <img src={f.origUrl} alt="" className="w-full h-full object-cover"/>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--tx-1)] truncate">{f.name}</p>
                  {f.status==='processing' && (
                    <div className="flex items-center gap-2 mt-1">
                      <div className="h-1 flex-1 bg-[var(--surface-3)] rounded-full overflow-hidden">
                        <div className="h-full w-1/2 bg-[var(--ac)] rounded-full anim-shimmer"/>
                      </div>
                      <span className="text-xs text-[var(--tx-4)]">Compressing…</span>
                    </div>
                  )}
                  {f.status==='done' && (
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-xs text-[var(--tx-4)]">{formatBytes(f.origSize)}</span>
                      <span className="text-xs text-[var(--tx-4)]">→</span>
                      <span className="text-xs font-medium text-[var(--green)]">{formatBytes(f.compSize)}</span>
                      <span className={cn('badge', f.compSize<f.origSize ? 'badge-green' : 'badge-orange')}>{savingsPercent(f.origSize,f.compSize)}</span>
                    </div>
                  )}
                  {f.status==='error' && <p className="text-xs text-[var(--red)] mt-1">{f.error}</p>}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {f.status==='processing' && <RefreshCw size={14} className="text-[var(--ac)] anim-spin"/>}
                  {f.status==='done' && <><CheckCircle size={14} className="text-[var(--green)]"/><button onClick={()=>dl(f)} className="btn-secondary btn-sm"><Download size={12}/>Save</button></>}
                  {f.status==='error' && <AlertCircle size={14} className="text-[var(--red)]"/>}
                  <button onClick={()=>setFiles(p=>p.filter(x=>x.id!==f.id))} className="btn-ghost btn-xs p-1.5 rounded-md"><X size={13}/></button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
