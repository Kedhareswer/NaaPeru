/*
  Guardrails utilities: input moderation, prompt-injection detection, off-topic gating,
  simple rate limiting, and safe response builders.
*/

export type Severity = 'low' | 'medium' | 'high'

export interface SafetyIssue {
  category: string
  severity: Severity
  evidence: string[]
}

export interface AnalysisResult {
  allowed: boolean
  offTopic: boolean
  promptInjection: boolean
  issues: SafetyIssue[]
}

// Simple in-memory rate limiter (best-effort; suitable for small personal sites)
const rateStore: Map<string, number[]> = new Map()

export function checkRateLimit(
  key: string,
  limit = 20,
  windowMs = 60_000
): { allowed: boolean; retryAfterSec?: number } {
  const now = Date.now()
  const windowStart = now - windowMs
  const events = rateStore.get(key)?.filter((t) => t > windowStart) ?? []
  if (events.length >= limit) {
    const retryAfterMs = events[0] + windowMs - now
    return { allowed: false, retryAfterSec: Math.max(1, Math.ceil(retryAfterMs / 1000)) }
  }
  events.push(now)
  rateStore.set(key, events)
  return { allowed: true }
}

// Heuristic detectors
const INJECTION_PATTERNS = [
  /ignore (all|any|previous|prior) (instructions|guidelines|rules)/i,
  /disregard (the )?(above|previous) (instructions|rules)/i,
  /forget (the )?(above|previous) (instructions|rules)/i,
  /do not follow (the )?(system|previous) (instructions|prompt)/i,
  /reveal (the )?(system|developer) prompt/i,
  /show (me )?(the )?(hidden|internal|system) (instructions|prompt)/i,
  /bypass (the )?(guardrails|safety|safeguards|filters)/i,
  /jailbreak|DAN\b|dev mode|developer mode/i,
  /act as (an|a) unfiltered|without any restrictions|no rules apply/i,
]

const ILLEGAL_PATTERNS = [
  /how to (make|build) (a )?bomb|explosive/i,
  /credit card (numbers|details)|ssn\b|social security/i,
  /hack(ing)? (into|a)|bypass password|crack password/i,
  /malware|ransomware|keylogger|botnet/i,
]

const NSFW_PATTERNS = [
  /sexually explicit|porn|pornography|nude|rape/i,
]

const HATE_VIOLENCE_PATTERNS = [
  /kill|murder|assassinate|should die/i,
  /racial slur|genocide|ethnic cleansing/i,
]

const SELF_HARM_PATTERNS = [
  /suicide|kill myself|self harm/i,
]

const PII_PATTERNS = [
  /passwords?|api key|secret key|private key|otp\b/i,
]

// Allowed domain keywords for the assistant (portfolio domain)
const ALLOWED_KEYWORDS = [
  'kedhar', 'kedhareswer', 'kedhareswer naidu',
  'background', 'bio', 'about', 'summary',
  'skills', 'tech stack', 'technologies', 'programming languages',
  'projects', 'portfolio', 'github', 'kaggle', 'linkedin',
  'experience', 'work history', 'internship', 'roles',
  'education', 'degree', 'university', 'cgpa',
  'contact', 'email', 'phone', 'meeting', 'appointment', 'schedule',
]

function testAny(patterns: RegExp[], text: string): string[] {
  const hits: string[] = []
  for (const re of patterns) {
    if (re.test(text)) hits.push(re.source)
  }
  return hits
}

export function analyzeUserInput(input: string): AnalysisResult {
  const text = input?.toString().slice(0, 5000) || '' // hard cap
  const lower = text.toLowerCase()

  const issues: SafetyIssue[] = []

  const inj = testAny(INJECTION_PATTERNS, text)
  if (inj.length) issues.push({ category: 'prompt_injection', severity: 'high', evidence: inj })

  const illegal = testAny(ILLEGAL_PATTERNS, text)
  if (illegal.length) issues.push({ category: 'illegal', severity: 'high', evidence: illegal })

  const nsfw = testAny(NSFW_PATTERNS, text)
  if (nsfw.length) issues.push({ category: 'nsfw', severity: 'high', evidence: nsfw })

  const hate = testAny(HATE_VIOLENCE_PATTERNS, text)
  if (hate.length) issues.push({ category: 'hate_violence', severity: 'high', evidence: hate })

  const selfHarm = testAny(SELF_HARM_PATTERNS, text)
  if (selfHarm.length) issues.push({ category: 'self_harm', severity: 'high', evidence: selfHarm })

  const pii = testAny(PII_PATTERNS, text)
  if (pii.length) issues.push({ category: 'sensitive_pii', severity: 'medium', evidence: pii })

  // Off-topic heuristic: none of the allowed keywords present
  const offTopic = !ALLOWED_KEYWORDS.some((k) => lower.includes(k))

  const severe = issues.some((i) => i.severity === 'high')

  return {
    allowed: !severe && !offTopic,
    offTopic,
    promptInjection: inj.length > 0,
    issues,
  }
}

export function buildRefusalMessage(reason: 'prompt_injection' | 'illegal' | 'nsfw' | 'hate_violence' | 'self_harm' | 'pii' | 'rate_limit') {
  const headers = {
    prompt_injection: 'I can\'t do that.',
    illegal: 'I can\'t assist with that.',
    nsfw: 'I can\'t provide that content.',
    hate_violence: 'I can\'t help with that.',
    self_harm: 'I\'m sorry you\'re feeling this way.',
    pii: 'I can\'t share sensitive information.',
    rate_limit: 'You\'re going too fast.',
  } as const

  const bodies = {
    prompt_injection: 'I won\'t ignore prior instructions or system rules. I can help with Kedhareswer\'s background, skills, projects, or how to contact him.',
    illegal: 'I can\'t help with illegal or harmful activities. I can answer questions about Kedhareswer\'s profile, experience, and projects.',
    nsfw: 'I can\'t provide explicit content. I can answer questions about Kedhareswer\'s background, skills, projects, or contact details.',
    hate_violence: 'I can\'t help with violent or hateful requests. I can assist with questions about Kedhareswer\'s professional profile.',
    self_harm: 'If you\'re in immediate danger, please seek help from local emergency services or a trusted person. I\'m here to answer questions about Kedhareswer\'s background, skills, and projects.',
    pii: 'I can\'t disclose passwords, API keys, or other secrets. I can share public contact information from the profile if needed.',
    rate_limit: 'Please try again in a moment. Quick tip: you can ask about background, skills, projects, or contact.',
  } as const

  return `${headers[reason]} ${bodies[reason]}`
}

export function buildOffTopicMessage() {
  const suggestions = [
    'Tell me about his background',
    'What are his technical skills?',
    'Show me his projects',
    'How can I contact him?'
  ]
  return `I can best help with questions about Kedhareswer. Try one of these:
• ${suggestions.join('\n• ')}`
}

export function sanitizeConversation(conversation: Array<{ role: string; content: string }>) {
  // Drop user messages that contain obvious injection attempts
  return (conversation || []).filter((m) => {
    if (m.role !== 'user') return true
    return !INJECTION_PATTERNS.some((re) => re.test(m.content))
  })
}

// Redact typical secret tokens in text
function redactSecrets(text: string): { redacted: string; redactions: string[] } {
  const rules: Array<{ re: RegExp; label: string }> = [
    { re: /(sk|rk|pk|ghp|gho|ghu|ghs|glpat|pat|xox[aboprs]-)[A-Za-z0-9-_]{10,}/g, label: 'token' },
    { re: /AKIA[0-9A-Z]{16}/g, label: 'aws_access_key' },
    { re: /(?:aws|amazon)[-_ ]?secret[-_ ]?(?:access)?[-_ ]?key\s*[:=]?\s*[A-Za-z0-9/+]{30,}/gi, label: 'aws_secret' },
    { re: /AIza[0-9A-Za-z\-_]{35}/g, label: 'google_api_key' },
  ]
  let out = text
  const labels: string[] = []
  for (const { re, label } of rules) {
    if (re.test(out)) {
      out = out.replace(re, '[REDACTED]')
      labels.push(label)
    }
  }
  return { redacted: out, redactions: labels }
}

export function moderateModelOutput(content: string) {
  const issues: SafetyIssue[] = []
  const hitsIllegal = testAny(ILLEGAL_PATTERNS, content)
  if (hitsIllegal.length) issues.push({ category: 'illegal', severity: 'high', evidence: hitsIllegal })
  const hitsNsfw = testAny(NSFW_PATTERNS, content)
  if (hitsNsfw.length) issues.push({ category: 'nsfw', severity: 'high', evidence: hitsNsfw })
  const hitsHate = testAny(HATE_VIOLENCE_PATTERNS, content)
  if (hitsHate.length) issues.push({ category: 'hate_violence', severity: 'high', evidence: hitsHate })
  const hitsSelf = testAny(SELF_HARM_PATTERNS, content)
  if (hitsSelf.length) issues.push({ category: 'self_harm', severity: 'high', evidence: hitsSelf })
  const hitsPii = testAny(PII_PATTERNS, content)
  if (hitsPii.length) issues.push({ category: 'sensitive_pii', severity: 'medium', evidence: hitsPii })

  const severe = issues.some((i) => i.severity === 'high')

  // Always redact secrets in output regardless
  const { redacted, redactions } = redactSecrets(content)
  if (redactions.length && !issues.some(i => i.category === 'sensitive_pii')) {
    issues.push({ category: 'sensitive_pii', severity: 'medium', evidence: redactions })
  }

  return { content: redacted, issues, blocked: severe }
}
