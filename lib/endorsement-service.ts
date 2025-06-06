// In-memory endorsement service

interface Skill {
  id: string;
  name: string;
  category: string;
  endorsements: number;
  rating: number;
  endorsed: Set<string>; // Set of emails who endorsed this skill
}

class EndorsementService {
  private skills: Map<string, Skill> = new Map();
  
  constructor() {
    // Initialize with default skills
    const initialSkills: Skill[] = [
      { id: '1', name: 'Python', category: 'Technical Skills', endorsements: 42, rating: 4.8, endorsed: new Set() },
      { id: '2', name: 'Machine Learning', category: 'Technical Skills', endorsements: 38, rating: 4.7, endorsed: new Set() },
      { id: '3', name: 'Deep Learning', category: 'Technical Skills', endorsements: 35, rating: 4.6, endorsed: new Set() },
      { id: '4', name: 'Computer Vision', category: 'Technical Skills', endorsements: 31, rating: 4.5, endorsed: new Set() },
      { id: '5', name: 'NLP', category: 'Technical Skills', endorsements: 29, rating: 4.4, endorsed: new Set() },
      { id: '6', name: 'Data Analysis', category: 'Technical Skills', endorsements: 36, rating: 4.6, endorsed: new Set() },
      { id: '7', name: 'Statistical Modeling', category: 'Technical Skills', endorsements: 27, rating: 4.3, endorsed: new Set() },
      { id: '8', name: 'SQL', category: 'Technical Skills', endorsements: 33, rating: 4.5, endorsed: new Set() },
      { id: '9', name: 'Power BI', category: 'Tools & Platforms', endorsements: 25, rating: 4.2, endorsed: new Set() },
      { id: '10', name: 'Tableau', category: 'Tools & Platforms', endorsements: 24, rating: 4.1, endorsed: new Set() },
      { id: '11', name: 'Hugging Face', category: 'Tools & Platforms', endorsements: 22, rating: 4.0, endorsed: new Set() },
      { id: '12', name: 'Git', category: 'Tools & Platforms', endorsements: 30, rating: 4.4, endorsed: new Set() },
      { id: '13', name: 'Problem Solving', category: 'Soft Skills', endorsements: 40, rating: 4.8, endorsed: new Set() },
      { id: '14', name: 'Team Leadership', category: 'Soft Skills', endorsements: 32, rating: 4.5, endorsed: new Set() },
      { id: '15', name: 'Project Management', category: 'Soft Skills', endorsements: 28, rating: 4.3, endorsed: new Set() },
      { id: '16', name: 'Communication', category: 'Soft Skills', endorsements: 34, rating: 4.6, endorsed: new Set() },
    ];
    
    initialSkills.forEach(skill => {
      this.skills.set(skill.id, skill);
    });
  }
  
  getAllSkills(): { id: string; name: string; category: string; endorsements: number; rating: number }[] {
    return Array.from(this.skills.values()).map(skill => ({
      id: skill.id,
      name: skill.name,
      category: skill.category,
      endorsements: skill.endorsements,
      rating: skill.rating
    }));
  }
  
  checkIfEndorsed(skillId: string, email: string): boolean {
    const skill = this.skills.get(skillId);
    return skill ? skill.endorsed.has(email) : false;
  }
  
  endorseSkill(skillId: string, email: string): { success: boolean; message?: string; skill?: any } {
    const skill = this.skills.get(skillId);
    
    if (!skill) {
      return { success: false, message: 'Skill not found' };
    }
    
    if (skill.endorsed.has(email)) {
      return { success: false, message: 'You have already endorsed this skill' };
    }
    
    // Add the email to the set of endorsers
    skill.endorsed.add(email);
    
    // Increment the endorsement count
    skill.endorsements += 1;
    
    // Update the skill rating slightly based on new endorsement
    // More endorsements means higher confidence in the rating
    skill.rating = Math.min(5.0, skill.rating + 0.01);
    
    return { 
      success: true,
      message: `Successfully endorsed ${skill.name}`,
      skill: {
        id: skill.id,
        name: skill.name,
        category: skill.category,
        endorsements: skill.endorsements,
        rating: skill.rating
      }
    };
  }
  
  getSkillsByCategory(category: string): { id: string; name: string; category: string; endorsements: number; rating: number }[] {
    return this.getAllSkills().filter(skill => skill.category === category);
  }
}

// Singleton instance
const endorsementService = new EndorsementService();
export default endorsementService;
