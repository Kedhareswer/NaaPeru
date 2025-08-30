import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import profileData from '@/data/profile.json';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Types hoisted to module scope to avoid re-definition on each call
type WorkExperience = {
  role: string;
  company: string;
  duration: string;
  achievements: string[];
};

type Education = {
  degree: string;
  institution: string;
  duration: string;
  location: string;
  gpa?: string;
  marks?: string;
};

type Project = {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
};

// Helper to ensure we only embed safe http(s) links
function safeHttpUrl(input: unknown): string | null {
  try {
    if (typeof input !== 'string') return null;
    const url = new URL(input.trim());
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : null;
  } catch {
    return null;
  }
}

// Load profile data
async function loadProfile() {
  return profileData;
}

// Generate dynamic system prompt with profile data
let cachedPrompt: string | null = null;
async function getSystemPrompt(): Promise<string> {
  if (cachedPrompt) return cachedPrompt;
  try {
    const profile = await loadProfile();
    
    // Format work experience
    const experienceArr = Array.isArray((profile as { experience?: WorkExperience[] }).experience)
      ? (profile.experience as WorkExperience[])
      : [];
    const workExperience = experienceArr.map((job: WorkExperience) => {
      const bullets = Array.isArray(job.achievements) ? job.achievements.join('\n      • ') : '';
      return `Role: ${job.role} at ${job.company} (${job.duration})${bullets ? `\n      • ${bullets}` : ''}`;
    }).join('\n\n');

    // Format education
    const eduArr = Array.isArray((profile as { education?: Education[] }).education)
      ? (profile.education as Education[])
      : [];
    const education = eduArr.map((edu: Education) => {
      const score = typeof edu.gpa === 'string' && edu.gpa
        ? `GPA: ${edu.gpa}`
        : (typeof edu.marks === 'string' && edu.marks ? `Marks: ${edu.marks}` : '');
      return `${edu.degree} from ${edu.institution} (${edu.duration})\n      • Location: ${edu.location}${score ? `\n      • ${score}` : ''}`;
    }).join('\n\n');

    // Format projects
    const projArr = Array.isArray((profile as { projects?: Project[] }).projects)
      ? (profile.projects as Project[])
      : [];
    const projects = projArr.map((project: Project) => {
      const techs = Array.isArray(project.technologies) ? project.technologies.join(', ') : '';
      const gh = safeHttpUrl(project.github);
      const demo = safeHttpUrl(project.demo);
      const links = [
        gh && `[View on GitHub](${gh})`,
        demo && `[Live Demo](${demo})`
      ].filter(Boolean).join(' | ');
      return `### ${project.title}\n${project.description}\n\n**Technologies:** ${techs}${links ? `\n${links}` : ''}`;
    }).join('\n\n---\n\n');
    
    const prompt = `You are ${profile.personalInfo.name}'s professional assistant. Your role is to help visitors learn about ${profile.personalInfo.name}'s professional background, skills, and projects. Keep responses concise, professional, and focused on their expertise.

## Key Points
- **Role:** ${profile.personalInfo.title}
- **Skills:** ${Array.isArray(profile.skills?.programmingLanguages) ? profile.skills.programmingLanguages.join(', ') : 'N/A'}${Array.isArray(profile.skills?.aiTools) && profile.skills.aiTools.length ? `, ${profile.skills.aiTools.slice(0, 3).join(', ')}` : ''}
- **About:** ${profile.summary}

## Work Experience
${workExperience}

## Education
${education}

## Featured Projects
${projects}

## Response Guidelines
1. Be professional but approachable in your responses
2. When asked about work experience or education, provide detailed information from the relevant sections
3. When discussing projects, highlight the key aspects, technologies used, and any notable outcomes
4. For project inquiries, mention both the technical details and the practical applications
5. If asked about specific skills, relate them to real-world applications from the experience/projects
6. If asked about capabilities beyond their expertise, politely redirect to relevant skills
7. Keep responses concise but informative, using markdown for better readability
8. If unsure about something, say you'll help find the information
`;
    cachedPrompt = prompt.trim();
    return cachedPrompt;
  } catch (error) {
    console.error('Error loading profile:', error);
    // Fallback to a basic prompt if profile loading fails
    return `You are a professional assistant. Your role is to help visitors learn about the professional's background, skills, and projects.`;
  }
}

export async function POST(request: NextRequest) {
  try {
    let payload: any;
    try {
      payload = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Bad Request: body must be valid JSON.' },
        { status: 400, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    const message = typeof payload?.message === 'string' ? payload.message : '';
    const rawUserInput = typeof payload?.rawUserInput === 'string' ? payload.rawUserInput : '';
    const conversation = Array.isArray(payload?.conversation) ? payload.conversation : [];
    const mode = typeof payload?.mode === 'string' ? payload.mode : 'standard';

    // Validate and normalize conversation history from client; drop untrusted system/malformed entries
    const MAX_MESSAGES = 20;
    const MAX_CHARS_PER_MESSAGE = 2000;
    const MAX_TOTAL_CHARS = 10000;
    const HISTORY_MAX = Math.min(10, MAX_MESSAGES - 1);

    const rawHistory: any[] = Array.isArray(payload?.messages)
      ? payload.messages
      : (Array.isArray(conversation) ? conversation : []);

    const sanitizedHistory: { role: 'user' | 'assistant'; content: string }[] = [];
    for (let i = 0; i < rawHistory.length; i++) {
      const m = rawHistory[i];
      const role = typeof m?.role === 'string' ? m.role : '';
      if (role !== 'user' && role !== 'assistant') continue; // drop system/unknown roles
      const content = typeof m?.content === 'string' ? m.content.trim() : '';
      if (!content) continue; // drop malformed entries
      sanitizedHistory.push({ role, content });
    }

    // Clamp to last N entries to control context length
    const validatedHistory = sanitizedHistory.slice(-HISTORY_MAX);

    // Ensure there is a final user message supplied by the client
    const userContentCandidate = (typeof rawUserInput === 'string' && rawUserInput.trim())
      ? rawUserInput.trim()
      : (typeof message === 'string' ? message.trim() : '');

    if (!userContentCandidate) {
      return NextResponse.json(
        { error: 'Bad Request: a final user "message" (or "rawUserInput") is required and must be a non-empty string.' },
        { status: 400, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    // Enforce limits (history + final user message)
    let totalChars = 0;
    for (let i = 0; i < validatedHistory.length; i++) {
      const c = validatedHistory[i].content;
      if (c.length > MAX_CHARS_PER_MESSAGE) {
        return NextResponse.json(
          { error: `Bad Request: message at index ${i} exceeds ${MAX_CHARS_PER_MESSAGE} characters.` },
          { status: 400, headers: { 'Cache-Control': 'no-store' } }
        );
      }
      totalChars += c.length;
    }

    if (userContentCandidate.length > MAX_CHARS_PER_MESSAGE) {
      return NextResponse.json(
        { error: `Bad Request: final user message exceeds ${MAX_CHARS_PER_MESSAGE} characters.` },
        { status: 400, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    if ((validatedHistory.length + 1) > MAX_MESSAGES) {
      return NextResponse.json(
        { error: `Bad Request: too many messages. Max is ${MAX_MESSAGES} including the final user message.` },
        { status: 400, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    if ((totalChars + userContentCandidate.length) > MAX_TOTAL_CHARS) {
      return NextResponse.json(
        { error: `Bad Request: total payload too large. Max is ${MAX_TOTAL_CHARS} characters.` },
        { status: 400, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'Server misconfiguration: GROQ_API_KEY is not set.' },
        { status: 500, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    // No rate limiting or input moderation

    // Prepare messages with enhanced system prompt based on mode
    const baseSystemPrompt = await getSystemPrompt();
    
    // Enhance system prompt based on conversation mode
    let enhancedPrompt = baseSystemPrompt;
    if (mode === 'detailed') {
      enhancedPrompt += "\n\nIMPORTANT: Provide detailed, factually accurate responses. If you are unsure about any fact, state that uncertainty.";
    } else if (mode === 'creative') {
      enhancedPrompt += "\n\nIMPORTANT: Be conversational and engaging, but do NOT invent facts. If unsure, respond that you do not have that information.";
    } else {
      enhancedPrompt += "\n\nIMPORTANT: Keep responses concise and fact-based. If you don't know something, say so explicitly.";
    }

    // Use normalized, clamped history and ensure system-first and user-last ordering
    const messages = [
      { role: 'system', content: enhancedPrompt },
      ...validatedHistory,
      { role: 'user', content: userContentCandidate },
    ];

    // Adjust parameters based on mode
    const modeParams = {
      standard: { temperature: 0.1, max_tokens: 300 },
      detailed: { temperature: 0.15, max_tokens: 500 },
      creative: { temperature: 0.2, max_tokens: 400 }
    };

    const params = modeParams[mode as keyof typeof modeParams] || modeParams.standard;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20_000);
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages,
        ...params,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) {
      let errorPayload: any = null;
      try {
        errorPayload = await response.json();
      } catch {
        try { errorPayload = await response.text(); } catch {}
      }
      console.error('Groq API Error:', errorPayload || response.statusText);
      return NextResponse.json(
        { error: 'Failed to get response from AI service' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'I apologize, but I encountered an error processing your request. Please try again later.' },
      { status: 500 }
    );
  }
}
