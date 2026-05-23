import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ActiveTool, ChatSession, ChatMessage, HistoryItem } from '@/types'

function genId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
}

interface AppState {
  // Navigation
  activeTool: ActiveTool
  sidebarOpen: boolean
  setActiveTool: (tool: ActiveTool) => void
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void

  // Chat
  sessions: ChatSession[]
  activeSessionId: string | null
  createSession: () => string
  deleteSession: (id: string) => void
  addMessage: (sessionId: string, msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void
  updateSessionTitle: (sessionId: string, title: string) => void
  getActiveSession: () => ChatSession | undefined
  setActiveSession: (id: string) => void

  // History (tool usage)
  history: HistoryItem[]
  addHistory: (item: Omit<HistoryItem, 'id' | 'timestamp'>) => void
  clearHistory: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      activeTool: 'chat',
      sidebarOpen: true,
      sessions: [],
      activeSessionId: null,
      history: [],

      setActiveTool: (activeTool) => set({ activeTool }),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

      createSession: () => {
        const id = genId()
        const session: ChatSession = {
          id, title: 'New conversation',
          messages: [], createdAt: Date.now(), updatedAt: Date.now(),
        }
        set((s) => ({ sessions: [session, ...s.sessions], activeSessionId: id }))
        return id
      },

      deleteSession: (id) => set((s) => {
        const sessions = s.sessions.filter((x) => x.id !== id)
        const activeSessionId =
          s.activeSessionId === id ? (sessions[0]?.id ?? null) : s.activeSessionId
        return { sessions, activeSessionId }
      }),

      addMessage: (sessionId, msg) => set((s) => ({
        sessions: s.sessions.map((sess) =>
          sess.id === sessionId
            ? { ...sess, messages: [...sess.messages, { ...msg, id: genId(), timestamp: Date.now() }], updatedAt: Date.now() }
            : sess
        ),
      })),

      updateSessionTitle: (sessionId, title) => set((s) => ({
        sessions: s.sessions.map((sess) =>
          sess.id === sessionId ? { ...sess, title } : sess
        ),
      })),

      getActiveSession: () => {
        const { sessions, activeSessionId } = get()
        return sessions.find((s) => s.id === activeSessionId)
      },

      setActiveSession: (id) => set({ activeSessionId: id }),

      addHistory: (item) => set((s) => ({
        history: [{ ...item, id: genId(), timestamp: Date.now() }, ...s.history].slice(0, 50),
      })),

      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'ai-workspace-store',
      partialize: (s) => ({ sessions: s.sessions, activeSessionId: s.activeSessionId, history: s.history }),
    }
  )
)
