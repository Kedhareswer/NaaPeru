import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

// Load profile data
async function loadProfile() {
  const dataDirectory = path.join(process.cwd(), 'data');
  const filePath = path.join(dataDirectory, 'profile.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  return JSON.parse(jsonData);
}

// Generate dynamic system prompt with profile data
async function getSystemPrompt() {
  try {
    const profile = await loadProfile();
    
    return `You are ${profile.personalInfo.name}'s professional assistant. Your role is to help visitors learn about ${profile.personalInfo.name}'s professional background, skills, and projects. Keep responses concise, professional, and focused on their expertise.

Key points about ${profile.personalInfo.name}:
- ${profile.personalInfo.title}
- Specializes in: ${profile.skills.frontend.slice(0, 4).join(', ')}
- Has experience with: ${profile.skills.dataScience.slice(0, 3).join(', ')}
- ${profile.summary}

When responding:
1. Be professional but approachable
2. Keep responses focused on ${profile.personalInfo.name}'s professional background
3. If asked about capabilities beyond their expertise, politely redirect to relevant skills
4. For project inquiries, highlight key technologies and outcomes
5. If unsure about something, say you'll help find the information`;
  } catch (error) {
    console.error('Error loading profile:', error);
    // Fallback to a basic prompt if profile loading fails
    return `You are a professional assistant. Your role is to help visitors learn about the professional's background, skills, and projects.`;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, conversation = [] } = await request.json();
    
    if (!process.env.GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY is not configured');
    }

    // Prepare messages with system prompt
    const systemPrompt = await getSystemPrompt();
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversation,
      { role: 'user', content: message }
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Groq API Error:', errorData);
      return NextResponse.json(
        { error: 'Failed to get response from AI service' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'I apologize, but I encountered an error processing your request. Please try again later.' },
      { status: 500 }
    );
  }
}
