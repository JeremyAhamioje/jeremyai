'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Send, Square, Paperclip, Copy, ThumbsUp, ThumbsDown,
  ChevronDown, RotateCcw, User
} from 'lucide-react'
import Image from 'next/image'
import { useAppStore } from '@/store'
import { parseMarkdown, formatTime, cn } from '@/lib/utils'
import type { ChatMessage } from '@/types'

/* ── Logo avatar for AI ───────────────────────────────────────────────────── */
function AIAvatar({ size = 24 }: { size?: number }) {
  return (
    <div
      className="rounded-full overflow-hidden flex-shrink-0 bg-[var(--surface-2)] border border-[var(--border)]"
      style={{ width: size, height: size }}
    >
      <Image
        src="https://res.cloudinary.com/dz6kxumoo/image/upload/v1778753717/Screenshot_2026-05-14_110457-removebg-preview_w4uqpi.png"
        alt="AI"
        width={size}
        height={size}
        className="w-full h-full object-contain p-0.5"
        unoptimized
      />
    </div>
  )
}

/* ── User avatar ─────────────────────────────────────────────────────────── */
function UserAvatar({ size = 24 }: { size?: number }) {
  return (
    <div
      className="rounded-full flex-shrink-0 bg-[var(--ac-subtle)] border border-[var(--ac-border)] flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <User size={size * 0.5} className="text-[var(--ac-text)]" strokeWidth={2} />
    </div>
  )
}

/* ── Typing dots ─────────────────────────────────────────────────────────── */
function TypingDots() {
  return (
    <div className="flex items-end gap-3 py-1">
      <AIAvatar size={28} />
      <div className="flex items-center gap-1 px-4 py-3 rounded-2xl rounded-tl-sm bg-[var(--surface)] border border-[var(--border)]" style={{ boxShadow: 'var(--shadow-xs)' }}>
        {[0, 1, 2].map(i => (
          <span
            key={i}
            className="block w-1.5 h-1.5 rounded-full bg-[var(--tx-3)]"
            style={{ animation: `dot-bounce 1.2s ease infinite`, animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </div>
    </div>
  )
}

/* ── Message bubble ──────────────────────────────────────────────────────── */
function Message({ msg }: { msg: ChatMessage }) {
  const [copied, setCopied] = useState(false)
  const [liked, setLiked] = useState<null | 'up' | 'down'>(null)
  const isUser = msg.role === 'user'

  const copy = async () => {
    await navigator.clipboard.writeText(msg.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className={cn('flex items-end gap-3 group', isUser ? 'flex-row-reverse' : 'flex-row')}>
      {isUser ? <UserAvatar size={28} /> : <AIAvatar size={28} />}

      <div className={cn('flex flex-col gap-1 max-w-[78%] min-w-0', isUser ? 'items-end' : 'items-start')}>
        {/* Bubble */}
        {isUser ? (
          <div
            className="px-4 py-3 rounded-2xl rounded-br-sm text-sm leading-relaxed text-white"
            style={{ background: 'var(--ac)', boxShadow: 'var(--shadow-xs)' }}
          >
            <p className="whitespace-pre-wrap break-words">{msg.content}</p>
          </div>
        ) : (
          <div
            className="px-4 py-3 rounded-2xl rounded-tl-sm bg-[var(--surface)] border border-[var(--border)]"
            style={{ boxShadow: 'var(--shadow-xs)' }}
          >
            <div
              className="prose-ai text-sm break-words"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.content) }}
            />
          </div>
        )}

        {/* Actions row */}
        <div className={cn(
          'flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity',
          isUser ? 'flex-row-reverse' : 'flex-row'
        )}>
          <span className="text-[11px] text-[var(--tx-4)] px-1.5">{formatTime(msg.timestamp)}</span>
          <button onClick={copy} className="btn-ghost btn-xs p-1.5 rounded-md" title="Copy">
            <Copy size={12} className={copied ? 'text-[var(--green)]' : 'text-[var(--tx-3)]'} />
          </button>
          {!isUser && (
            <>
              <button
                onClick={() => setLiked(liked === 'up' ? null : 'up')}
                className={cn('btn-ghost btn-xs p-1.5 rounded-md', liked === 'up' && 'text-[var(--green)]')}
              >
                <ThumbsUp size={12} />
              </button>
              <button
                onClick={() => setLiked(liked === 'down' ? null : 'down')}
                className={cn('btn-ghost btn-xs p-1.5 rounded-md', liked === 'down' && 'text-[var(--red)]')}
              >
                <ThumbsDown size={12} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Empty / welcome state ───────────────────────────────────────────────── */
const SUGGESTIONS = [
  { label: 'Explain a concept', body: 'Explain how large language models work in simple terms.' },
  { label: 'Write for me', body: 'Write a concise professional bio for a software engineer.' },
  { label: 'Analyze & summarize', body: 'Summarize the key ideas from a piece of text I provide.' },
  { label: 'Help me code', body: 'Help me write a Python function to parse a CSV file.' },
]

function EmptyState({ onSend }: { onSend: (p: string) => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 pb-8 anim-fade">
      <div className="mb-8 flex flex-col items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center overflow-hidden" style={{ boxShadow: 'var(--shadow-md)' }}>
          <Image
            src="https://res.cloudinary.com/dz6kxumoo/image/upload/v1778753717/Screenshot_2026-05-14_110457-removebg-preview_w4uqpi.png"
            alt="AI Workspace"
            width={48} height={48}
            className="w-11 h-11 object-contain"
            unoptimized
          />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-[var(--tx-1)] tracking-tight">How can I help?</h2>
          <p className="text-sm text-[var(--tx-3)] mt-1">Ask me anything — writing, research, code, ideas.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-xl">
        {SUGGESTIONS.map(s => (
          <button
            key={s.label}
            onClick={() => onSend(s.body)}
            className="card card-sm card-hover text-left px-4 py-3 group"
          >
            <p className="text-sm font-medium text-[var(--tx-2)] group-hover:text-[var(--tx-1)] transition-colors leading-snug">{s.label}</p>
            <p className="text-xs text-[var(--tx-4)] mt-0.5 line-clamp-1">{s.body}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── Input bar ───────────────────────────────────────────────────────────── */
function InputBar({
  onSend, loading, onStop,
}: { onSend: (t: string) => void; loading: boolean; onStop: () => void }) {
  const [text, setText] = useState('')
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!ref.current) return
    ref.current.style.height = 'auto'
    ref.current.style.height = Math.min(ref.current.scrollHeight, 180) + 'px'
  }, [text])

  const submit = () => {
    const t = text.trim()
    if (!t || loading) return
    setText('')
    onSend(t)
  }

  return (
    <div className="flex-shrink-0 px-4 pb-5 pt-2">
      <div className="max-w-2xl mx-auto">
        <div
          className="bg-[var(--surface)] border border-[var(--border-med)] rounded-2xl overflow-hidden transition-all duration-150 focus-within:border-[var(--ac)] focus-within:shadow-[0_0_0_3px_var(--ac-subtle)]"
          style={{ boxShadow: 'var(--shadow-sm)' }}
        >
          <textarea
            ref={ref}
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit() }
            }}
            placeholder="Message AI Workspace…"
            rows={1}
            disabled={loading}
            className="w-full bg-transparent px-4 pt-3.5 pb-1 text-sm text-[var(--tx-1)] placeholder-[var(--tx-4)] resize-none outline-none leading-relaxed"
            style={{ minHeight: 52, maxHeight: 180 }}
          />
          <div className="flex items-center justify-between px-3 pb-2.5">
            <div className="flex items-center gap-1">
              <button className="btn-ghost btn-xs p-1.5 rounded-md opacity-60" title="Attach (coming soon)">
                <Paperclip size={14} />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[var(--tx-4)] hidden sm:block">⏎ send · ⇧⏎ newline</span>
              {loading ? (
                <button
                  onClick={onStop}
                  className="w-8 h-8 rounded-xl flex items-center justify-center bg-[var(--red-bg)] border border-[rgba(192,57,43,0.2)] text-[var(--red)] hover:bg-[rgba(192,57,43,0.14)] transition-all"
                >
                  <Square size={12} />
                </button>
              ) : (
                <button
                  onClick={submit}
                  disabled={!text.trim()}
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-white transition-all active:scale-95"
                  style={{
                    background: text.trim() ? 'var(--ac)' : 'var(--surface-3)',
                    opacity: text.trim() ? 1 : 0.5,
                    cursor: text.trim() ? 'pointer' : 'default',
                  }}
                >
                  <Send size={13} />
                </button>
              )}
            </div>
          </div>
        </div>
        <p className="text-center text-[11px] text-[var(--tx-4)] mt-2">AI may make mistakes. Verify important information.</p>
      </div>
    </div>
  )
}

/* ── Main chat view ──────────────────────────────────────────────────────── */
export default function ChatView() {
  const { activeSessionId, getActiveSession, addMessage, updateSessionTitle, createSession, sessions } = useAppStore()
  const [loading, setLoading] = useState(false)
  const [abort, setAbort] = useState<AbortController | null>(null)
  const [atBottom, setAtBottom] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!activeSessionId && sessions.length === 0) createSession()
  }, [activeSessionId, sessions.length, createSession])

  const session = getActiveSession()
  const messages = session?.messages ?? []

  const scrollToBottom = useCallback((smooth = true) => {
    bottomRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'instant' })
  }, [])

  useEffect(() => { scrollToBottom(false) }, [session?.id, scrollToBottom])
  useEffect(() => { if (atBottom) scrollToBottom() }, [messages.length, atBottom, scrollToBottom])

  const handleScroll = () => {
    if (!scrollRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
    setAtBottom(scrollHeight - scrollTop - clientHeight < 80)
  }

  const sendMessage = useCallback(async (content: string) => {
    let sid = activeSessionId
    if (!sid) sid = createSession()

    addMessage(sid, { role: 'user', content })
    if (messages.length === 0) {
      updateSessionTitle(sid, content.slice(0, 52) + (content.length > 52 ? '…' : ''))
    }

    setLoading(true)
    const ctrl = new AbortController()
    setAbort(ctrl)

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: content,
          history: messages.map(m => ({ role: m.role, content: m.content })),
        }),
        signal: ctrl.signal,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Request failed')
      addMessage(sid, { role: 'assistant', content: data.text })
    } catch (e: unknown) {
      if (e instanceof Error && e.name !== 'AbortError') {
        addMessage(sid, { role: 'assistant', content: `**Error:** ${e.message}` })
      }
    } finally {
      setLoading(false)
      setAbort(null)
    }
  }, [activeSessionId, addMessage, createSession, messages, updateSessionTitle])

  return (
    <div className="flex flex-col h-full bg-[var(--bg)]">
      {/* Messages */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto"
      >
        {messages.length === 0 ? (
          <EmptyState onSend={sendMessage} />
        ) : (
          <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Message msg={msg} />
              </motion.div>
            ))}
            {loading && <TypingDots />}
            <div ref={bottomRef} className="h-1" />
          </div>
        )}
      </div>

      {/* Scroll-to-bottom pill */}
      <AnimatePresence>
        {!atBottom && messages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
            className="absolute bottom-28 left-1/2 -translate-x-1/2 z-10"
          >
            <button
              onClick={() => scrollToBottom()}
              className="btn-secondary btn-sm gap-1.5 rounded-full shadow-md"
            >
              <ChevronDown size={13} /> Jump to latest
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <InputBar onSend={sendMessage} loading={loading} onStop={() => { abort?.abort(); setLoading(false) }} />
    </div>
  )
}
