import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const runtime = 'edge';

export async function POST(req) {
  const { prompt } = await req.json();
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Missing Google API key' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const result = await streamText({
      model: google('gemini-1.5-pro-latest'),
      prompt,
      apiKey,
    });

    return new Response(result.textStream, {
      headers: { 'Content-Type': 'text/plain' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}