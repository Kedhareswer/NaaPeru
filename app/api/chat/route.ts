import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import profileData from '@/data/profile.json';

// Load profile data
async function loadProfile() {
  return profileData;
}

// Generate dynamic system prompt with profile data
async function getSystemPrompt() {
  try {
    const profile = await loadProfile();
    
    // Define types for work experience and education
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

    // Format work experience
    const workExperience = (profile.experience as WorkExperience[]).map((job: WorkExperience) => 
      `Role: ${job.role} at ${job.company} (${job.duration})\n      • ${job.achievements.join('\n      • ')}`
    ).join('\n\n');

    // Format education
    const education = (profile.education as Education[]).map((edu: Education) => 
      `${edu.degree} from ${edu.institution} (${edu.duration})\n      • Location: ${edu.location}\n      • ${'gpa' in edu ? `GPA: ${edu.gpa}` : `Marks: ${edu.marks}`}`
    ).join('\n\n');

    // Format projects
    const projects = (profile.projects as Project[]).map((project: Project) => 
      `### ${project.title}\n${project.description}\n\n**Technologies:** ${project.technologies.join(', ')}\n` +
      `${project.github ? `\n[View on GitHub](${project.github})` : ''}` +
      `${project.demo ? ` | [Live Demo](${project.demo})` : ''}`
    ).join('\n\n---\n\n');
    
    return `You are ${profile.personalInfo.name}'s professional assistant. Your role is to help visitors learn about ${profile.personalInfo.name}'s professional background, skills, and projects. Keep responses concise, professional, and focused on their expertise.

## Key Points
- **Role:** ${profile.personalInfo.title}
- **Skills:** ${profile.skills.programmingLanguages.join(', ')}, ${profile.skills.aiTools.slice(0, 3).join(', ')}
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
  } catch (error) {
    console.error('Error loading profile:', error);
    // Fallback to a basic prompt if profile loading fails
    return `You are a professional assistant. Your role is to help visitors learn about the professional's background, skills, and projects.`;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, conversation = [], mode = 'standard', rawUserInput = '' } = await request.json();
    
    if (!process.env.GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY is not configured');
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

    // Use conversation as-is
    const messages = [
      { role: 'system', content: enhancedPrompt },
      ...(conversation || []),
      { role: 'user', content: rawUserInput || message }
    ];

    // Adjust parameters based on mode
    const modeParams = {
      standard: { temperature: 0.1, max_tokens: 300 },
      detailed: { temperature: 0.15, max_tokens: 500 },
      creative: { temperature: 0.2, max_tokens: 400 }
    };

    const params = modeParams[mode as keyof typeof modeParams] || modeParams.standard;

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
