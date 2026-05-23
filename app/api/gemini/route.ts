import { NextResponse } from 'next/server'

const API_KEY  = process.env.GEMINI_API_KEY
const MODEL_ID = 'gemini-2.5-flash'
const BASE_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:generateContent`

interface HistoryMessage { role: 'user' | 'assistant'; content: string }

async function callGemini(prompt: string, history: HistoryMessage[] = [], retries = 3) {
  // Build multi-turn contents array
  const contents = [
    ...history.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    })),
    { role: 'user', parts: [{ text: prompt }] },
  ]

  const body = {
    contents,
    generationConfig: {
      temperature: 0.9,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 8192,
    },
    systemInstruction: {
      parts: [{
        text: `You are an AI assistant inside "AI Workspace" — a professional productivity suite.
You are helpful, concise, and intelligent. You can assist with writing, analysis, coding, planning, and general questions.
Format responses with markdown when it improves clarity. Keep responses focused and avoid unnecessary padding.
If the user provides file content or tool output, reference it directly in your response.`
      }]
    }
  }

  for (let attempt = 0; attempt < retries; attempt++) {
    const res = await fetch(`${BASE_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (res.status === 503 || res.status === 429) {
      // Exponential back-off
      await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt)))
      continue
    }

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error?.message ?? `Gemini API error ${res.status}`)
    }

    return data
  }

  throw new Error('Gemini API is temporarily unavailable. Please try again.')
}

export async function POST(req: Request) {
  try {
    if (!API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key is not configured. Add GEMINI_API_KEY to your .env.local file.' },
        { status: 500 }
      )
    }

    const body = await req.json()
    const { prompt, history = [] } = body

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'prompt is required' }, { status: 400 })
    }

    const data = await callGemini(prompt.trim(), history)

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text).join('') ??
      'No response generated.'

    return NextResponse.json({ text })

  } catch (err) {
    console.error('[Gemini API Error]', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
