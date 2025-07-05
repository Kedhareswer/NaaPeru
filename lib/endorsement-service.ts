import sql from './db';

interface Skill {
  id: number;
  name: string;
  category: string;
  endorsements: number;
}

class EndorsementService {
  async getAllSkills(): Promise<Skill[]> {
    const skills = await sql`SELECT id, name, category, endorsements FROM skills ORDER BY endorsements DESC` as Skill[];
    return skills;
  }

  async getSkillsByCategory(category: string): Promise<Skill[]> {
    const skills = await sql`SELECT id, name, category, endorsements FROM skills WHERE category = ${category} ORDER BY endorsements DESC` as Skill[];
    return skills;
  }
  
  async checkIfEndorsed(skillId: string, email: string): Promise<boolean> {
    const result = await sql`SELECT 1 FROM endorsements WHERE skill_id = ${skillId} AND endorser_email = ${email} LIMIT 1`;
    return result.length > 0;
  }

  async endorseSkill(skillId: string, email: string): Promise<{ success: boolean; message?: string; skill?: Skill }> {
    try {
      // Check if skill exists
      const [skill] = await sql`SELECT * FROM skills WHERE id = ${skillId}` as any as Skill[];
      if (!skill) {
        return { success: false, message: 'Skill not found' };
      }
      
      // Check duplicate endorsement
      const alreadyEndorsed = await this.checkIfEndorsed(skillId, email);
      if (alreadyEndorsed) {
        return { success: false, message: 'You have already endorsed this skill' };
      }
      
      // Insert endorsement and update skill counters sequentially
      await sql`INSERT INTO endorsements (skill_id, endorser_email) VALUES (${skillId}, ${email})`;
      await sql`UPDATE skills SET endorsements = endorsements + 1 WHERE id = ${skillId}`;

      // Fetch updated skill
      const [updatedSkill] = await sql`SELECT id, name, category, endorsements FROM skills WHERE id = ${skillId}` as any as Skill[];
      
      return { 
        success: true,
        message: `Successfully endorsed ${updatedSkill.name}`,
        skill: updatedSkill,
      };
    } catch (error) {
      console.error('Error in endorseSkill:', error);
      return { success: false, message: 'An error occurred while processing your endorsement' };
    }
  }
}

const endorsementService = new EndorsementService();
export default endorsementService;
