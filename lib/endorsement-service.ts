import fs from 'fs/promises';
import path from 'path';

interface SkillData {
  id: string;
  name: string;
  category: string;
  endorsements: number;
  rating: number;
  endorsed: string[]; // Array of emails who endorsed this skill
}

interface Skill extends Omit<SkillData, 'endorsed'> {
  endorsed: Set<string>; // Set of emails who endorsed this skill
}

class EndorsementService {
  private skills: Map<string, Skill> = new Map();
  private dataFilePath: string;
  
  constructor() {
    // Set up data directory and file path
    const dataDir = path.join(process.cwd(), 'data');
    this.dataFilePath = path.join(dataDir, 'endorsements.json');
    
    // Initialize data directory and file if they don't exist
    this.initializeDataFile().catch(console.error);
  }
  
  private async initializeDataFile() {
    try {
      await fs.mkdir(path.dirname(this.dataFilePath), { recursive: true });
      
      // Check if file exists
      try {
        await fs.access(this.dataFilePath);
      } catch {
        // File doesn't exist, create with default data
        const defaultSkills: SkillData[] = [
          { id: '1', name: 'Python', category: 'Technical Skills', endorsements: 42, rating: 4.8, endorsed: [] },
          { id: '2', name: 'Machine Learning', category: 'Technical Skills', endorsements: 38, rating: 4.7, endorsed: [] },
          { id: '3', name: 'Deep Learning', category: 'Technical Skills', endorsements: 35, rating: 4.6, endorsed: [] },
          { id: '4', name: 'Computer Vision', category: 'Technical Skills', endorsements: 31, rating: 4.5, endorsed: [] },
          { id: '5', name: 'NLP', category: 'Technical Skills', endorsements: 29, rating: 4.4, endorsed: [] },
          { id: '6', name: 'Data Analysis', category: 'Technical Skills', endorsements: 36, rating: 4.6, endorsed: [] },
          { id: '7', name: 'Statistical Modeling', category: 'Technical Skills', endorsements: 27, rating: 4.3, endorsed: [] },
          { id: '8', name: 'SQL', category: 'Technical Skills', endorsements: 33, rating: 4.5, endorsed: [] },
          { id: '9', name: 'Power BI', category: 'Tools & Platforms', endorsements: 25, rating: 4.2, endorsed: [] },
          { id: '10', name: 'Tableau', category: 'Tools & Platforms', endorsements: 24, rating: 4.1, endorsed: [] },
          { id: '11', name: 'Hugging Face', category: 'Tools & Platforms', endorsements: 22, rating: 4.0, endorsed: [] },
          { id: '12', name: 'Git', category: 'Tools & Platforms', endorsements: 30, rating: 4.4, endorsed: [] },
          { id: '13', name: 'Problem Solving', category: 'Soft Skills', endorsements: 40, rating: 4.8, endorsed: [] },
          { id: '14', name: 'Team Leadership', category: 'Soft Skills', endorsements: 32, rating: 4.5, endorsed: [] },
          { id: '15', name: 'Project Management', category: 'Soft Skills', endorsements: 28, rating: 4.3, endorsed: [] },
          { id: '16', name: 'Communication', category: 'Soft Skills', endorsements: 34, rating: 4.6, endorsed: [] },
        ];
        
        await this.saveSkillsToFile(defaultSkills);
      }
      
      // Load data from file
      await this.loadSkillsFromFile();
    } catch (error) {
      console.error('Error initializing data file:', error);
      throw error;
    }
  }
  
  private async loadSkillsFromFile() {
    try {
      const data = await fs.readFile(this.dataFilePath, 'utf-8');
      const skillsData: SkillData[] = JSON.parse(data);
      
      // Convert array of emails back to Set
      this.skills = new Map(
        skillsData.map(skill => [
          skill.id, 
          { 
            ...skill, 
            endorsed: new Set(skill.endorsed) 
          }
        ])
      );
    } catch (error) {
      console.error('Error loading skills from file:', error);
      throw error;
    }
  }
  
  private async saveSkillsToFile(skillsData: SkillData[]) {
    try {
      await fs.writeFile(this.dataFilePath, JSON.stringify(skillsData, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error saving skills to file:', error);
      throw error;
    }
  }
  
  private async saveCurrentSkills() {
    const skillsData = Array.from(this.skills.values()).map(skill => ({
      ...skill,
      endorsed: Array.from(skill.endorsed) // Convert Set to array for JSON
    }));
    
    await this.saveSkillsToFile(skillsData);
  }
  
  async getAllSkills(): Promise<{ id: string; name: string; category: string; endorsements: number; rating: number }[]> {
    // Always load fresh data from file
    await this.loadSkillsFromFile();
    
    return Array.from(this.skills.values()).map(skill => ({
      id: skill.id,
      name: skill.name,
      category: skill.category,
      endorsements: skill.endorsements,
      rating: skill.rating
    }));
  }
  
  async checkIfEndorsed(skillId: string, email: string): Promise<boolean> {
    await this.loadSkillsFromFile(); // Ensure we have the latest data
    const skill = this.skills.get(skillId);
    return skill ? skill.endorsed.has(email) : false;
  }
  
  async endorseSkill(skillId: string, email: string): Promise<{ success: boolean; message?: string; skill?: any }> {
    try {
      // Always load fresh data first
      await this.loadSkillsFromFile();
      
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
      skill.rating = Math.min(5.0, skill.rating + 0.01);
      
      // Save the updated data
      await this.saveCurrentSkills();
      
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
    } catch (error) {
      console.error('Error in endorseSkill:', error);
      return { 
        success: false, 
        message: 'An error occurred while processing your endorsement' 
      };
    }
  }
  
  async getSkillsByCategory(category: string): Promise<{ id: string; name: string; category: string; endorsements: number; rating: number }[]> {
    const skills = await this.getAllSkills();
    return skills.filter(skill => skill.category === category);
  }
}

// Singleton instance
const endorsementService = new EndorsementService();
export default endorsementService;
