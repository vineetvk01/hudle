import db from '../db/default';

export const insertCandidate = async ({ userId, jobProfile }) => {
  const insertedCandidate = await db.query('INSERT INTO candidate (login_id, job_profile ) VALUES ($1, $2) RETURNING *',
    [userId, jobProfile]
  );
  return insertedCandidate.rows[0];
}

export const fetch = async ({ userId }) => {
  const fetchedData = await db.query('SELECT id, job_profile FROM candidate WHERE login_id = $1', [userId]);
  return fetchedData.rows[0];
}

export const addOrUpdateSkills = async ({ skillId, candidateId }) => {
  const fetched = await db.query('SELECT candidate_id FROM candidate_skills WHERE candidate_id = $1 AND skill_id = $2',
    [candidateId, skillId]
  )
  if (!fetched.rows[0]) {
    await db.query('INSERT INTO candidate_skills (candidate_id, skill_id ) VALUES ($1, $2)',
      [candidateId, skillId]
    );
  }
}

export const fetchSkills = async({ userId }) => {
  const fetchSkills = await db.query('SELECT candidate_id, skill_id FROM candidate_skills WHERE candidate_id = $1', [userId]);
  return fetchSkills.rows.map((record)=>{
    return record.skill_id;
  })
}