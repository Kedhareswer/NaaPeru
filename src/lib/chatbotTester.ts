import { queryMatcher } from "./chatbotMatcher";

// Comprehensive test suite for chatbot
export const testChatbot = () => {
  const tests = [
    // Greetings
    { query: "hi", expected: "greeting", category: "Greetings" },
    { query: "hello", expected: "greeting", category: "Greetings" },
    { query: "hey", expected: "greeting", category: "Greetings" },
    { query: "yo", expected: "greeting", category: "Greetings" },
    
    // About/Who are you
    { query: "who are you", expected: "about", category: "About" },
    { query: "tell me about yourself", expected: "about", category: "About" },
    { query: "introduce yourself", expected: "about", category: "About" },
    { query: "what do you do", expected: "about", category: "About" },
    
    // Experience/Work
    { query: "tell me about your experience", expected: "experience", category: "Experience" },
    { query: "what's your work", expected: "experience", category: "Experience" },
    { query: "wahts your work", expected: "experience", category: "Experience" },
    { query: "my work", expected: "experience", category: "Experience" },
    { query: "your work", expected: "experience", category: "Experience" },
    { query: "where do you work", expected: "experience", category: "Experience" },
    { query: "current job", expected: "experience", category: "Experience" },
    { query: "work experience", expected: "experience", category: "Experience" },
    { query: "job", expected: "experience", category: "Experience" },
    
    // Projects
    { query: "what projects have you built?", expected: "projects", category: "Projects" },
    { query: "show me your projects", expected: "projects", category: "Projects" },
    { query: "what have you built", expected: "projects", category: "Projects" },
    { query: "your projects", expected: "projects", category: "Projects" },
    { query: "projects", expected: "projects", category: "Projects" },
    
    // Skills
    { query: "what are your skills", expected: "skills", category: "Skills" },
    { query: "what can you do", expected: "skills", category: "Skills" },
    { query: "tech stack", expected: "skills", category: "Skills" },
    { query: "programming languages", expected: "skills", category: "Skills" },
    
    // Education
    { query: "where did you study", expected: "education", category: "Education" },
    { query: "your education", expected: "education", category: "Education" },
    { query: "university", expected: "education", category: "Education" },
    
    // Contact
    { query: "how can i contact you", expected: "contact", category: "Contact" },
    { query: "email", expected: "contact", category: "Contact" },
    { query: "linkedin", expected: "contact", category: "Contact" },
    
    // Hobbies
    { query: "what do you do for fun", expected: "hobbies", category: "Hobbies" },
    { query: "hobbies", expected: "hobbies", category: "Hobbies" },
    
    // Achievements
    { query: "achievements", expected: "achievements", category: "Achievements" },
    { query: "what are you proud of", expected: "achievements", category: "Achievements" },
    
    // Location
    { query: "where are you from", expected: "location", category: "Location" },
    { query: "where do you live", expected: "location", category: "Location" },
    
    // Age
    { query: "how old are you", expected: "age", category: "Age" },
    { query: "your age", expected: "age", category: "Age" },
    
    // Future plans
    { query: "what are your future plans", expected: "future", category: "Future" },
    { query: "goals", expected: "future", category: "Future" },
    
    // Thank you
    { query: "thank you", expected: "thanks", category: "Thanks" },
    { query: "thanks", expected: "thanks", category: "Thanks" },
    
    // Goodbye
    { query: "bye", expected: "goodbye", category: "Goodbye" },
    { query: "goodbye", expected: "goodbye", category: "Goodbye" },
  ];

  const results: any[] = [];
  let passed = 0;
  let failed = 0;

  tests.forEach((test) => {
    const response = queryMatcher.getResponse(test.query);
    const responseType = detectResponseType(response);
    const success = responseType === test.expected;
    
    if (success) {
      passed++;
    } else {
      failed++;
    }

    results.push({
      query: test.query,
      expected: test.expected,
      actual: responseType,
      success,
      category: test.category,
      response: response.substring(0, 100) + "...",
    });
  });

  return {
    total: tests.length,
    passed,
    failed,
    results,
  };
};

// Helper to detect response type
const detectResponseType = (response: string): string => {
  const lower = response.toLowerCase();
  
  if (lower.includes("hey!") && lower.includes("what would you like to know")) return "greeting";
  if (lower.includes("i'm **kedhar**") || lower.includes("i'm **marlakunta")) return "about";
  if (lower.includes("diligencevault") && lower.includes("current")) return "experience";
  if (lower.includes("thesisflow") || lower.includes("quantumpdf")) return "projects";
  if (lower.includes("tech stack") || lower.includes("languages:")) return "skills";
  if (lower.includes("lovely professional university")) return "education";
  if (lower.includes("kedhareswer.12110626@gmail.com")) return "contact";
  if (lower.includes("gaming") && lower.includes("reading")) return "hobbies";
  if (lower.includes("90% accuracy") || lower.includes("82% semantic")) return "achievements";
  if (lower.includes("madanapalli") && lower.includes("punjab")) return "location";
  if (lower.includes("graduated in july 2025")) return "age";
  if (lower.includes("future plans") || lower.includes("short-term")) return "future";
  if (lower.includes("you're welcome")) return "thanks";
  if (lower.includes("see you later")) return "goodbye";
  if (lower.includes("hmm, interesting question")) return "default";
  if (lower.includes("not sure i understood")) return "confused";
  
  return "unknown";
};

// Run tests and log results
export const runTests = () => {
  console.log("🤖 Running Chatbot Tests...\n");
  const results = testChatbot();
  
  console.log(`📊 Results: ${results.passed}/${results.total} passed (${((results.passed/results.total)*100).toFixed(1)}%)\n`);
  
  // Group by category
  const byCategory: any = {};
  results.results.forEach((r: any) => {
    if (!byCategory[r.category]) {
      byCategory[r.category] = { passed: 0, failed: 0, tests: [] };
    }
    if (r.success) {
      byCategory[r.category].passed++;
    } else {
      byCategory[r.category].failed++;
      byCategory[r.category].tests.push(r);
    }
  });
  
  // Show failed tests by category
  Object.keys(byCategory).forEach((category) => {
    const cat = byCategory[category];
    if (cat.failed > 0) {
      console.log(`❌ ${category}: ${cat.failed} failed`);
      cat.tests.forEach((t: any) => {
        console.log(`   "${t.query}" → Expected: ${t.expected}, Got: ${t.actual}`);
      });
    } else {
      console.log(`✅ ${category}: All passed`);
    }
  });
  
  return results;
};
