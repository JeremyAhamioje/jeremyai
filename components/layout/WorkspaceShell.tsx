'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
  MessageSquare, ImageIcon, FileText, FilePlus, ArrowLeftRight,
  ChevronLeft, Trash2, Plus, Settings, Menu, X,
  Sun, Moon, Clock, SlidersHorizontal
} from 'lucide-react'
import { useAppStore } from '@/store'
import { formatDate, cn } from '@/lib/utils'
import type { ActiveTool } from '@/types'

/* ── Tool registry ──────────────────────────────────────────────────────── */
const TOOLS: {
  id: ActiveTool; label: string; icon: React.ReactNode
  description: string; img?: string; group: 'ai' | 'tools'
}[] = [
  {
    id: 'chat', label: 'AI Chat', group: 'ai',
    icon: <MessageSquare size={15} strokeWidth={1.8} />,
    description: 'Powered by Gemini',
  },
  {
    id: 'image-compressor', label: 'Image Compressor', group: 'tools',
    icon: <ImageIcon size={15} strokeWidth={1.8} />,
    description: 'Compress without quality loss',
    img: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1778749490/Gemini_Generated_Image_ru26ceru26ceru26_eshv6a.png',
  },
  {
    id: 'pdf-merger', label: 'PDF Merger', group: 'tools',
    icon: <FileText size={15} strokeWidth={1.8} />,
    description: 'Combine & reorder PDFs',
    img: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1778749488/Gemini_Generated_Image_69uwbm69uwbm69uw_j18t3r.png',
  },
  {
    id: 'docx-generator', label: 'DOCX Generator', group: 'tools',
    icon: <FilePlus size={15} strokeWidth={1.8} />,
    description: 'Build Word documents',
    img: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1778749469/Gemini_Generated_Image_2rzr2i2rzr2i2rzr_bow9mo.png',
  },
  {
    id: 'file-converter', label: 'File Converter', group: 'tools',
    icon: <ArrowLeftRight size={15} strokeWidth={1.8} />,
    description: 'Convert between formats',
    img: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1778749488/Gemini_Generated_Image_69uwbm69uwbm69uw_j18t3r.png',
  },
]

/* ── Theme toggle ─────────────────────────────────────────────────────────── */
function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = stored === 'dark' || (!stored && prefersDark)
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggle}
      className="btn-ghost btn-sm w-8 h-8 p-0 rounded-md"
      title={dark ? 'Light mode' : 'Dark mode'}
    >
      {dark
        ? <Sun size={15} className="text-[var(--tx-3)]" />
        : <Moon size={15} className="text-[var(--tx-3)]" />}
    </button>
  )
}

/* ── Sidebar content ─────────────────────────────────────────────────────── */
function SidebarContent({ onClose }: { onClose?: () => void }) {
  const {
    activeTool, setActiveTool,
    sessions, activeSessionId, createSession, deleteSession, setActiveSession,
    history,
  } = useAppStore()

  const handleTool = (id: ActiveTool) => {
    setActiveTool(id)
    if (id === 'chat' && sessions.length === 0) createSession()
    onClose?.()
  }

  const aiTools  = TOOLS.filter(t => t.group === 'ai')
  const utilTools = TOOLS.filter(t => t.group === 'tools')
  const recentHistory = history.filter(h => h.tool === activeTool).slice(0, 12)

  return (
    <div className="flex flex-col h-full">

      {/* Logo */}
      <div className="flex items-center justify-between px-3 h-12 flex-shrink-0 border-b border-[var(--border)]">
        <div className="flex items-center gap-2.5">
          <Image
            src="https://res.cloudinary.com/dz6kxumoo/image/upload/v1778753717/Screenshot_2026-05-14_110457-removebg-preview_w4uqpi.png"
            alt="AI Workspace"
            width={96}
            height={28}
            className="object-contain"
            priority
            unoptimized
          />
        </div>
        {onClose && (
          <button onClick={onClose} className="btn-ghost btn-sm p-1.5">
            <X size={15} />
          </button>
        )}
      </div>

      {/* Scrollable nav */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4">

        {/* AI section */}
        <div>
          <p className="section-label px-2 mb-1.5">Assistant</p>
          {aiTools.map(tool => (
            <NavItem
              key={tool.id}
              tool={tool}
              isActive={activeTool === tool.id}
              onClick={() => handleTool(tool.id)}
            />
          ))}
        </div>

        {/* Utility tools */}
        <div>
          <p className="section-label px-2 mb-1.5">Tools</p>
          {utilTools.map(tool => (
            <NavItem
              key={tool.id}
              tool={tool}
              isActive={activeTool === tool.id}
              onClick={() => handleTool(tool.id)}
            />
          ))}
        </div>

        {/* Chat history */}
        {activeTool === 'chat' && (
          <div>
            <div className="flex items-center justify-between px-2 mb-1.5">
              <p className="section-label">History</p>
              <button
                onClick={() => { createSession(); onClose?.() }}
                className="btn-ghost btn-xs p-1 rounded-md"
                title="New chat"
              >
                <Plus size={13} />
              </button>
            </div>
            {sessions.length === 0 && (
              <p className="text-xs text-[var(--tx-4)] px-2 py-1.5">No conversations yet</p>
            )}
            {sessions.map(sess => (
              <div
                key={sess.id}
                onClick={() => { setActiveSession(sess.id); onClose?.() }}
                className={cn(
                  'group flex items-center gap-2 px-2 py-[7px] rounded-[var(--r-md)] cursor-pointer transition-all',
                  activeSessionId === sess.id
                    ? 'bg-[var(--surface-2)] text-[var(--tx-1)]'
                    : 'text-[var(--tx-3)] hover:bg-[var(--surface-2)] hover:text-[var(--tx-1)]'
                )}
              >
                <MessageSquare size={12} className="flex-shrink-0 opacity-50" />
                <span className="text-xs flex-1 truncate leading-5">{sess.title}</span>
                <button
                  onClick={e => { e.stopPropagation(); deleteSession(sess.id) }}
                  className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:text-[var(--red)] transition-all"
                >
                  <Trash2 size={11} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tool recent activity */}
        {activeTool !== 'chat' && recentHistory.length > 0 && (
          <div>
            <p className="section-label px-2 mb-1.5 flex items-center gap-1">
              <Clock size={10} /> Recent
            </p>
            {recentHistory.map(item => (
              <div
                key={item.id}
                className="flex items-start gap-2 px-2 py-[6px] rounded-[var(--r-md)] text-[var(--tx-4)] hover:text-[var(--tx-2)] hover:bg-[var(--surface-2)] transition-all cursor-default"
              >
                <span className="text-xs flex-1 truncate leading-5">{item.label}</span>
                <span className="text-[10px] flex-shrink-0 mt-0.5">{formatDate(item.timestamp)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom */}
      <div className="border-t border-[var(--border)] p-2 flex-shrink-0 flex items-center gap-1">
        <button className="btn-ghost btn-sm flex-1 justify-start gap-2 rounded-[var(--r-md)]">
          <Settings size={14} className="text-[var(--tx-3)]" />
          <span className="text-xs text-[var(--tx-3)]">Settings</span>
        </button>
        <ThemeToggle />
      </div>
    </div>
  )
}

/* ── Single nav item ─────────────────────────────────────────────────────── */
function NavItem({
  tool, isActive, onClick
}: {
  tool: typeof TOOLS[0]; isActive: boolean; onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-2.5 px-2.5 py-[7px] rounded-[var(--r-md)] text-left',
        'transition-all duration-150 group',
        isActive
          ? 'bg-[var(--ac-subtle)] text-[var(--tx-1)]'
          : 'text-[var(--tx-3)] hover:bg-[var(--surface-2)] hover:text-[var(--tx-1)]'
      )}
    >
      <span className={cn('flex-shrink-0 transition-colors', isActive ? 'text-[var(--ac)]' : 'text-[var(--tx-3)] group-hover:text-[var(--tx-2)]')}>
        {tool.icon}
      </span>
      <span className="text-sm font-medium flex-1 truncate">{tool.label}</span>
      {isActive && (
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--ac)] flex-shrink-0" />
      )}
    </button>
  )
}

/* ── Top bar ─────────────────────────────────────────────────────────────── */
function TopBar({ onMobileMenu }: { onMobileMenu: () => void }) {
  const { activeTool, sidebarOpen, toggleSidebar } = useAppStore()
  const tool = TOOLS.find(t => t.id === activeTool)

  return (
    <header
      className="h-12 flex-shrink-0 flex items-center justify-between px-3 border-b border-[var(--border)] bg-[var(--surface)]"
      style={{ boxShadow: 'var(--shadow-xs)' }}
    >
      <div className="flex items-center gap-2">
        {/* Desktop collapse */}
        <button
          onClick={toggleSidebar}
          className="hidden md:flex btn-ghost btn-sm p-1.5"
          title={sidebarOpen ? 'Collapse' : 'Expand'}
        >
          <ChevronLeft
            size={15}
            className={cn('text-[var(--tx-3)] transition-transform duration-200', !sidebarOpen && 'rotate-180')}
          />
        </button>
        {/* Mobile menu */}
        <button onClick={onMobileMenu} className="flex md:hidden btn-ghost btn-sm p-1.5">
          <Menu size={15} />
        </button>

        <div className="h-4 w-px bg-[var(--border)] hidden md:block" />

        <div className="flex items-center gap-2">
          <span className="text-[var(--ac)]">{tool?.icon}</span>
          <span className="text-sm font-semibold text-[var(--tx-1)]">{tool?.label}</span>
          {tool?.group === 'tools' && (
            <span className="badge-neutral">Tool</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Model badge — only for chat */}
        {activeTool === 'chat' && (
          <div className="badge-green hidden sm:flex gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse" />
            Gemini 2.5 Flash
          </div>
        )}
        <ThemeToggle />
      </div>
    </header>
  )
}

/* ── Shell ───────────────────────────────────────────────────────────────── */
export default function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const { sidebarOpen } = useAppStore()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Apply stored theme on mount
  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = stored === 'dark' || (!stored && prefersDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg)]">

      {/* Desktop sidebar */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.aside
            key="sidebar"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 248, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeInOut' }}
            className="hidden md:flex flex-shrink-0 overflow-hidden border-r border-[var(--border)] bg-[var(--surface)]"
            style={{ boxShadow: 'var(--shadow-xs)' }}
          >
            <div className="w-[248px] flex flex-col h-full">
              <SidebarContent />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -264 }} animate={{ x: 0 }} exit={{ x: -264 }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed left-0 top-0 bottom-0 w-64 z-50 md:hidden bg-[var(--surface)] border-r border-[var(--border)]"
            >
              <SidebarContent onClose={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar onMobileMenu={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-hidden bg-[var(--bg)]">
          {children}
        </main>
      </div>
    </div>
  )
}
