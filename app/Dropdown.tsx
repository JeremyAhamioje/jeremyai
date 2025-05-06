'use client';

import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function Dropdown() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`bg-[#1a1a1a] text-white fixed top-0 left-0 h-full transition-all duration-300 ${
        collapsed ? 'w-[60px]' : 'w-[280px]'
      }`}
    >
      {/* Toggle Button (Always Visible) */}
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white hover:text-blue-400 transition"
          aria-label="Toggle Sidebar"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Sidebar Content (Only if not collapsed) */}
      {!collapsed && (
        <div className="p-4 space-y-6 pt-10 overflow-y-auto">
          {/* Branding */}
          <div className="flex items-center gap-2">
            <img src="/logo.jpeg" alt="ChatGPT Icon" className="w-5 h-5" />
            <span className="font-semibold text-sm">JeremyAI</span>
          </div>

          {/* New Chat Button (non-functional placeholder) */}
          <button
            onClick={() => {}}
            className="text-white text-sm bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-xl"
          >
            + New Chat
          </button>

          <div className="text-sm text-white hover:text-blue-400 transition">
            Chats will be stored here
          </div>

          {/* Placeholder Chat History */}
          <div className="text-xs text-purple-500">Previous Chats</div>
          <div className="text-sm text-white truncate hover:text-blue-400 transition">
            Example chat 1
          </div>
          <div className="text-sm text-white truncate hover:text-blue-400 transition">
            Example chat 2
          </div>
        </div>
      )}
    </div>
  );
}
