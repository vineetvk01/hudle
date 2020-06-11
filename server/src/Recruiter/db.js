import db from '../db/default';

export const insert = async ({ userId, companyId }) => {
  const insertedCandidate = await db.query('INSERT INTO recruiter (login_id, company_id ) VALUES ($1, $2) RETURNING *',
    [userId, companyId]
  );
  return insertedCandidate.rows[0];
}

export const fetch = async ({ userId }) => {
  const fetchedRecruiter = await db.query(`
  SELECT recruiter.id as recruiter_id, company_id, industry, website, image_url, company.name 
  FROM recruiter 
  INNER JOIN company ON recruiter.company_id = company.id WHERE login_id = $1;
  `, [userId]);
  return fetchedRecruiter.rows[0];
}
