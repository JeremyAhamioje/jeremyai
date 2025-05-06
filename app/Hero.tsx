'use client';

import { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import { ArrowRight } from 'lucide-react';
import StarFieldOnly from './starfieldonly'; // Import the 3D scene

export default function MainPage() {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  // Fade in buttons on load
  useEffect(() => {
    const timeout = setTimeout(() => setButtonsVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  async function sendMessage(prompt: string) {
    setLoading(true);
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResponse(data.text);
    } catch (e) {
      setResponse('Error: Could not get a response.');
    } finally {
      setLoading(false);
    }
  }

  async function handleButtonClick(action: string) {
    await sendMessage(action); // Use button label directly as prompt
  }

  return (
    <div className="flex h-screen font-sans relative">
      {/* Starfield background */}
      <StarFieldOnly /> 

      <Dropdown />
      <main className="flex-1 text-white p-8 relative z-10">
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-4">What can I help with?</h1>
        </div>

        {/* Response Output */}
        <div className="absolute top-30 left-0 right-0 flex flex-col items-center">
          {loading && (
            <div className="mt-6 text-sm text-blue-300 animate-pulse">Thinking...</div>
          )}

          {response && !loading && (
            <div className="mt-6 max-w-3xl text-center text-sm bg-white/8 p-4 rounded-xl overflow-hidden max-h-[calc(100vh-200px)]">
              <div className="overflow-auto max-h-[600px] space-y-4 text-sm">
                {response
                  .split(/\n\s*\n/)
                  .map((para, idx) => (
                    <p key={idx} className="font-semibold text-white/90">{para}</p>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Feature Buttons with Fade-In */}
        <div className={`flex flex-wrap justify-center gap-4 mt-6 text-sm transition-opacity duration-1000 ${buttonsVisible ? 'opacity-100' : 'opacity-0'}`}>
          {['Create image', 'Surprise me', 'Help me write', 'Make a plan', 'Analyze data', 'More'].map((label) => (
            <button
              key={label}
              onClick={() => handleButtonClick(label)}
              className="bg-[#3b237e] hover:bg-[#5034a6] px-6 py-3 rounded-xl transition shadow-sm"
              disabled={loading}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Input + Buttons */}
        <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center">
          <div className="bg-[#2a1b5a] rounded-xl flex items-center justify-between px-6 py-4 max-w-4xl w-full mx-auto shadow-md">
            <input
              type="text"
              placeholder="Ask anything"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="bg-transparent outline-none text-white flex-1 placeholder:text-gray-300 text-sm"
              disabled={loading}
            />
            <div className="flex items-center gap-2 text-white">
              {['Search', 'Reason', 'Deep research', 'Create image'].map((label) => (
                <button
                  key={label}
                  onClick={() => handleButtonClick(label)}
                  className="text-sm bg-purple-700 hover:bg-purple-600 px-4 py-1.5 rounded-full"
                  disabled={loading}
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => sendMessage(userInput)}
                className="text-white w-8 h-8 flex items-center justify-center hover:text-blue-400"
                disabled={loading}
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
