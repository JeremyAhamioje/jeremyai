'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Plus, Download, Trash2, GripVertical, Type, AlignLeft, List, Heading1, Heading2, Minus, FileText, Eye, EyeOff } from 'lucide-react'
import { generateId, cn } from '@/lib/utils'
import { useAppStore } from '@/store'
import type { DocxSection } from '@/types'

type ST = DocxSection['type']

const BLOCKS: {type:ST;label:string;icon:React.ReactNode;ph:string}[] = [
  {type:'title',    label:'Title',    icon:<Type size={13}/>,      ph:'Document title…'},
  {type:'heading1', label:'Heading 1',icon:<Heading1 size={13}/>,  ph:'Section heading…'},
  {type:'heading2', label:'Heading 2',icon:<Heading2 size={13}/>,  ph:'Sub-heading…'},
  {type:'paragraph',label:'Paragraph',icon:<AlignLeft size={13}/>, ph:'Write a paragraph…'},
  {type:'bullet',   label:'Bullet',   icon:<List size={13}/>,      ph:'Bullet point…'},
  {type:'pagebreak',label:'Page Break',icon:<Minus size={13}/>,    ph:''},
]

const txClass: Record<ST,string> = {
  title:     'text-2xl font-bold text-[var(--tx-1)]',
  heading1:  'text-lg font-semibold text-[var(--tx-1)]',
  heading2:  'text-base font-semibold text-[var(--tx-2)]',
  paragraph: 'text-sm text-[var(--tx-2)] leading-relaxed',
  bullet:    'text-sm text-[var(--tx-2)]',
  pagebreak: 'text-xs text-[var(--tx-4)] text-center italic',
}

export default function DocxGenerator() {
  const [sections, setSections] = useState<DocxSection[]>([
    {id:generateId(),type:'title',content:''},
    {id:generateId(),type:'paragraph',content:''},
  ])
  const [generating, setGenerating] = useState(false)
  const [preview, setPreview] = useState(false)
  const [dragId, setDragId] = useState<string|null>(null)
  const [dragOver, setDragOver] = useState<string|null>(null)
  const { addHistory } = useAppStore()

  const add = (type: ST) => setSections(p=>[...p,{id:generateId(),type,content:''}])
  const update = (id:string, content:string) => setSections(p=>p.map(s=>s.id===id?{...s,content}:s))
  const remove = (id:string) => setSections(p=>p.filter(s=>s.id!==id))
  const reorder = (targetId:string) => {
    if (!dragId||dragId===targetId) return
    setSections(p=>{const a=[...p],fi=a.findIndex(s=>s.id===dragId),ti=a.findIndex(s=>s.id===targetId);const[m]=a.splice(fi,1);a.splice(ti,0,m);return a})
    setDragId(null);setDragOver(null)
  }

  const generate = async () => {
    const filled = sections.filter(s=>s.type==='pagebreak'||s.content.trim())
    if (!filled.length) return
    setGenerating(true)
    try {
      const {Document,Paragraph,TextRun,HeadingLevel,PageBreak,Packer} = await import('docx')
      const children = filled.map(s=>{
        if (s.type==='title') return new Paragraph({text:s.content,heading:HeadingLevel.TITLE,spacing:{after:400}})
        if (s.type==='heading1') return new Paragraph({text:s.content,heading:HeadingLevel.HEADING_1,spacing:{after:200}})
        if (s.type==='heading2') return new Paragraph({text:s.content,heading:HeadingLevel.HEADING_2,spacing:{after:160}})
        if (s.type==='paragraph') return new Paragraph({children:[new TextRun({text:s.content,size:24})],spacing:{after:240,line:360}})
        if (s.type==='bullet') return new Paragraph({text:s.content,bullet:{level:0},spacing:{after:120}})
        if (s.type==='pagebreak') return new Paragraph({children:[new PageBreak()]})
        return new Paragraph({text:s.content})
      })
      const doc = new Document({sections:[{properties:{},children}]})
      const blob = await Packer.toBlob(doc)
      const title = sections.find(s=>s.type==='title')?.content||'document'
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a'); a.href=url; a.download=`${title.replace(/[^a-z0-9]/gi,'_')}.docx`; a.click()
      addHistory({tool:'docx-generator',label:`"${title}" (${filled.length} blocks)`})
    } catch(e) { console.error(e) } finally { setGenerating(false) }
  }

  const wordCount = sections.reduce((n,s)=>n+(s.content.trim().split(/\s+/).filter(Boolean).length),0)

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border)] bg-[var(--surface)] flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl overflow-hidden border border-[var(--border)] flex-shrink-0 bg-[var(--surface-2)]">
            <Image src="https://res.cloudinary.com/dz6kxumoo/image/upload/v1778749469/Gemini_Generated_Image_2rzr2i2rzr2i2rzr_bow9mo.png" alt="" width={36} height={36} className="w-full h-full object-cover" unoptimized/>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[var(--tx-1)]">DOCX Generator</h2>
            <p className="text-xs text-[var(--tx-3)]">{wordCount} words · {sections.length} blocks</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={()=>setPreview(p=>!p)} className="btn-secondary btn-sm">
            {preview?<EyeOff size={13}/>:<Eye size={13}/>} {preview?'Edit':'Preview'}
          </button>
          <button onClick={generate} disabled={generating} className="btn-primary btn-sm">
            {generating?<FileText size={13} className="anim-spin"/>:<Download size={13}/>} {generating?'Generating…':'Export DOCX'}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {!preview && (
          <div className="w-44 flex-shrink-0 border-r border-[var(--border)] p-3 overflow-y-auto bg-[var(--bg-subtle)]">
            <p className="section-label mb-2">Add Block</p>
            {BLOCKS.map(b=>(
              <button key={b.type} onClick={()=>add(b.type)}
                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-[var(--r-md)] text-xs text-[var(--tx-3)] hover:text-[var(--tx-1)] hover:bg-[var(--surface-2)] transition-all text-left mb-0.5">
                <span className="text-[var(--ac)]">{b.icon}</span>{b.label}
              </button>
            ))}
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {preview ? (
            <div className="max-w-2xl mx-auto p-12 bg-white min-h-full">
              {sections.filter(s=>s.content||s.type==='pagebreak').map(s=>{
                if (s.type==='title')    return <h1 key={s.id} className="text-3xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">{s.content||'Untitled'}</h1>
                if (s.type==='heading1') return <h2 key={s.id} className="text-2xl font-bold text-gray-800 mt-8 mb-4">{s.content}</h2>
                if (s.type==='heading2') return <h3 key={s.id} className="text-xl font-semibold text-gray-700 mt-6 mb-3">{s.content}</h3>
                if (s.type==='paragraph') return <p key={s.id} className="text-gray-700 leading-8 mb-4">{s.content}</p>
                if (s.type==='bullet')   return <li key={s.id} className="text-gray-700 ml-6 mb-1.5 list-disc">{s.content}</li>
                if (s.type==='pagebreak') return <div key={s.id} className="border-t-2 border-dashed border-gray-200 my-8 text-center text-xs text-gray-400">Page Break</div>
                return null
              })}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto px-8 py-8 space-y-1">
              <AnimatePresence>
                {sections.map(s=>{
                  const meta = BLOCKS.find(b=>b.type===s.type)!
                  return (
                    <motion.div key={s.id} layout draggable
                      onDragStart={()=>setDragId(s.id)}
                      onDragOver={e=>{e.preventDefault();setDragOver(s.id)}}
                      onDrop={e=>{e.preventDefault();reorder(s.id)}}
                      onDragEnd={()=>{setDragId(null);setDragOver(null)}}
                      className={cn('group flex items-start gap-2 py-1', dragOver===s.id&&'border-t-2 border-[var(--ac)]', dragId===s.id&&'opacity-40')}
                    >
                      <div className="pt-2.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab"><GripVertical size={13} className="text-[var(--tx-4)]"/></div>
                      <div className="pt-2.5 w-5 flex-shrink-0"><span className="text-[var(--ac)] opacity-50">{meta.icon}</span></div>
                      <div className="flex-1">
                        {s.type==='pagebreak'
                          ? <div className="py-2 border-t border-dashed border-[var(--border-med)] text-center text-xs text-[var(--tx-4)]">── Page Break ──</div>
                          : s.type==='bullet'
                            ? <div className="flex items-start gap-2"><span className="text-[var(--ac)] text-sm mt-1.5">•</span>
                                <textarea value={s.content} onChange={e=>update(s.id,e.target.value)} placeholder={meta.ph} rows={1} className={cn('flex-1 bg-transparent outline-none resize-none placeholder-[var(--tx-4)]',txClass[s.type])} style={{fieldSizing:'content'} as React.CSSProperties}/>
                              </div>
                            : <textarea value={s.content} onChange={e=>update(s.id,e.target.value)} placeholder={meta.ph} rows={s.type==='paragraph'?3:1} className={cn('w-full bg-transparent outline-none resize-none placeholder-[var(--tx-4)] py-0.5',txClass[s.type])} style={{fieldSizing:'content'} as React.CSSProperties}/>
                        }
                      </div>
                      <button onClick={()=>remove(s.id)} className="pt-2 opacity-0 group-hover:opacity-100 btn-ghost btn-xs p-1 rounded-md text-[var(--tx-4)] hover:text-[var(--red)]"><Trash2 size={12}/></button>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
              <button onClick={()=>add('paragraph')} className="w-full flex items-center justify-center gap-1.5 py-3 mt-2 text-xs text-[var(--tx-4)] hover:text-[var(--tx-2)] border border-dashed border-[var(--border)] hover:border-[var(--border-med)] rounded-xl transition-all">
                <Plus size={13}/> Add block
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
