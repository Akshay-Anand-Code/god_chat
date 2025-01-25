import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

// Check for API key
if (!process.env.OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY is not set in environment variables');
  throw new Error('OpenAI API Key is not configured');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request) {
  try {
    // Validate request
    if (!req.body) {
      return NextResponse.json(
        { error: 'Request body is required' },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { messages, temperature, maxTokens } = body;

    // Validate required fields
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages,
      temperature: temperature || 0.7,
      max_tokens: maxTokens || 250,
      presence_penalty: 0.6,
      frequency_penalty: 0.5
    });

    return NextResponse.json(response.choices[0].message);
  } catch (error: unknown) {
    const err = error as Error & { 
      response?: { 
        status: number; 
        data: { error: { message: string } } 
      };
      code?: string;
    };

    console.error('OpenAI API error:', err);
    
    // Handle different types of errors
    if (err.response) {
      // OpenAI API error
      return NextResponse.json(
        { error: err.response.data.error.message || 'OpenAI API error' },
        { status: err.response.status }
      );
    } else if (err.code === 'ECONNRESET' || err.code === 'ETIMEDOUT') {
      // Network error
      return NextResponse.json(
        { error: 'Connection to OpenAI failed. Please try again.' },
        { status: 503 }
      );
    }

    // Generic error
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 