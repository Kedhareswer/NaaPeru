import { useState, useEffect, useCallback } from 'react';

interface Skill {
  id: string;
  name: string;
  category: string;
  endorsements: number;
  endorsed?: boolean;
}

export function useEndorsement() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const [endorsedSkills, setEndorsedSkills] = useState<Set<string>>(new Set());
  
  // Load all skills
  const loadSkills = useCallback(async (category?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      let url = '/api/endorsement/skills';
      if (category && category !== 'all') {
        url += `?category=${encodeURIComponent(category)}`;
        // Add a timestamp to prevent caching
        url += `${url.includes('?') ? '&' : '?'}_t=${Date.now()}`;
      } else {
        // Add a timestamp to prevent caching
        url += `?_t=${Date.now()}`;
      }
      
      const response = await fetch(url, {
        cache: 'no-store', // Prevent caching
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch skills');
      }
      
      const data = await response.json();
      
      // Extract unique categories
      const uniqueCategories: string[] = [];
      const categorySet = new Set<string>();
      
      data.skills.forEach((skill: Skill) => {
        if (!categorySet.has(skill.category)) {
          categorySet.add(skill.category);
          uniqueCategories.push(skill.category);
        }
      });
      
      setSkills(data.skills);
      setCategories(uniqueCategories);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Load initial data
  useEffect(() => {
    loadSkills();
  }, [loadSkills]);
  
  // Endorse a skill
  const endorseSkill = useCallback(async (skillId: string) => {
    if (!userEmail) {
      setError('Email is required for endorsement');
      return { success: false, message: 'Email is required for endorsement' };
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/endorsement/endorse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        body: JSON.stringify({ 
          skillId, 
          email: userEmail,
          // Add a timestamp to prevent caching
          _t: Date.now()
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to endorse skill');
      }
      
      // Update the skills list with the updated skill
      if (data.success && data.skill) {
        // Force a refresh of the skills list to get the latest data
        await loadSkills();
        
        // Add to endorsed skills set
        setEndorsedSkills(prev => new Set([...prev, skillId]));
      }
      
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(message);
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  }, [userEmail, loadSkills]);
  
  // Set user email for endorsements
  const setEmail = useCallback((email: string) => {
    setUserEmail(email);
    
    // Store in session storage for persistence across page refreshes
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('endorsement_email', email);
    }
  }, []);
  
  // Load email from session storage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedEmail = sessionStorage.getItem('endorsement_email');
      if (storedEmail) {
        setUserEmail(storedEmail);
      }
    }
  }, []);
  
  return {
    skills,
    categories,
    isLoading,
    error,
    userEmail,
    endorsedSkills,
    loadSkills,
    endorseSkill,
    setEmail,
  };
}
