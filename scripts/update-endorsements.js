const fs = require('fs').promises;
const path = require('path');

async function updateEndorsements() {
  try {
    const filePath = path.join(__dirname, '..', 'data', 'endorsements.json');
    const data = await fs.readFile(filePath, 'utf8');
    const skills = JSON.parse(data);
    
    // Update all endorsement counts to 1
    const updatedSkills = skills.map(skill => ({
      ...skill,
      endorsements: 1
    }));
    
    await fs.writeFile(filePath, JSON.stringify(updatedSkills, null, 2));
    console.log('Successfully updated all endorsement counts to 1');
  } catch (error) {
    console.error('Error updating endorsements:', error);
  }
}

updateEndorsements();
