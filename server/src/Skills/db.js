import db from '../db/default';

export const fetchAll = async () => {
  const fetchSkills = await db.query('SELECT id, name FROM skills');
  const skills = fetchSkills.rows;
  return skills;
}