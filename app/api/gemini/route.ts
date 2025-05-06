// app/pages/api/gemini.ts (or your preferred file path)
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Parsing the JSON body of the request
    const { prompt } = await req.json();

    // Check if the prompt exists
    if (!prompt) {
      console.error('No prompt provided');
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const API_KEY = process.env.GEMINI_API_KEY;

    if (!API_KEY) {
      throw new Error("Missing GEMINI_API_KEY in environment");
    }
    
    const MODEL_ID = 'gemini-2.0-flash-001';

    // Check if the API_KEY is set in the environment variables
    if (!API_KEY) {
      console.error('Missing GEMINI_API_KEY');
      return NextResponse.json({ error: 'Missing GEMINI_API_KEY' }, { status: 500 });
    }

    // Request the Gemini API with the provided prompt
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    // Check if the request was successful
    if (!geminiRes.ok) {
      console.error(`Error fetching Gemini API: ${geminiRes.statusText}`);
      return NextResponse.json({ error: 'Error fetching Gemini API' }, { status: 500 });
    }

    // Parse the Gemini API response
    const result = await geminiRes.json();

    // DEBUGGING: Log the raw response from Gemini
    console.log('Gemini raw response:', result);

    // Extract the text from the response
    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received.';

    // Return the result as JSON
    return NextResponse.json({ text });
  } catch (error) {
    // Log any errors that occur
    console.error('Gemini API error:', error);

    // Return an error response with status 500
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
