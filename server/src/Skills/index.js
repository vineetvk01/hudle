import * as db from './db';


export const fetchSkills = async () => {
  return db.fetchAll();
}