import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OpenAI API Key');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, temperature, maxTokens } = body;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages,
      temperature,
      max_tokens: maxTokens,
      presence_penalty: 0.6,
      frequency_penalty: 0.5
    });

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 