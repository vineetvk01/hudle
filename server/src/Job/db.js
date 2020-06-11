import db from '../db/default';

export const insert = async ({
  title,
  location,
  jobProfile,
  jobDescription,
  isActive,
  postedOn,
  managedBy
}) => {
  const inserted = await db.query('INSERT INTO job (title, location, job_profile, job_description, is_active, managed_by, posted_on) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', 
  [title, location, jobProfile, jobDescription, isActive, managedBy, postedOn])
  return inserted.rows[0];
}

export const fetchJobs = async ({ jobProfile, skills }) => {
  const fetchedJobs = await db.query(`SELECT 
  job.id, 
  job.title, 
  job.location, 
  job.job_profile, 
  job.job_description, 
  job.is_active,
  job.posted_on,
  login.first_name,
  login.last_name,
  login.email,
  company.name,
  company.industry,
  company.website,
  company.image_url
  FROM job INNER JOIN recruiter ON job.managed_by = recruiter.id 
  INNER JOIN login ON recruiter.login_id = login.id 
  INNER JOIN company ON recruiter.company_id = company.id 
  WHERE job_profile = $1`,
    [jobProfile]);
  return fetchedJobs.rows;
}


export const applyJob = async ({ candidateId, jobId, appliedOn }) => {

  const added = await db.query('INSERT INTO candidate_job ( candidate_id, job_id, status, applied_on) VALUES ($1, $2, $3, $4) RETURNING *',
    [candidateId, jobId, 'applied', new Date(appliedOn).toUTCString()]
  );
  if (added.rows.length > 0) {
    return true;
  }
  return false;
}

export const fetchAppliedJobs = async({ candidateId, status }) => {
  let query = `
  SELECT cj.job_id, cj.status, cj.applied_on, job.title, job.location, job.job_profile,
  job.is_active,
  com.name, com.website, com.image_url
  FROM candidate_job AS cj 
  INNER JOIN job ON cj.job_id = job.id
  INNER JOIN recruiter AS r ON r.id = job.managed_by
  INNER JOIN company AS com ON com.id = r.company_id
  WHERE cj.candidate_id = $1
  `;
  if(status){
    query+='AND cj.status = $2;';
    const appliedJobs = await db.query(query, [candidateId, status]);
    return appliedJobs.rows;
  }
  query+=';';
  const appliedJobs = await db.query(query, [candidateId]);
  return appliedJobs.rows;
}

export const fetchJobsFromManagedBy = async ({ managedBy }) => {
  const fetched = await db.query('SELECT id, title, location, job_profile, job_description, is_active, posted_on FROM job WHERE managed_by = $1', [managedBy]);
  return fetched.rows;
}

export const updateJobStatus = async ({ jobId, managedBy, active}) => {
  const updated = await db.query(`UPDATE job
  SET is_active = $1
  WHERE
  id = $2 AND managed_by = $3 RETURNING *;`,
  [active, jobId, managedBy]);

  if(updated.rows.length < 1 ){
    throw new Error('This job is not posted by you')
  }

}

export const getAllApplications = async ({managedBy}) => {
  const application = await db.query(`
  SELECT login.first_name, login.last_name, login.email, login.gender, login.profile_image, job.id as job_id, job.title, job.location, cj.candidate_id, cj.status, cj.applied_on
  FROM candidate_job as cj INNER JOIN job ON job.id = cj.job_id INNER JOIN candidate ON candidate.id = cj.candidate_id INNER JOIN login ON login.id =candidate.login_id
  WHERE job.managed_by = $1;
  `, [managedBy])
  return application.rows;
};

export const updateApplicationStatus = async ({jobId, candidateId, status}) => {
  const application = await db.query(`
  UPDATE candidate_job 
  SET status = $1
  WHERE candidate_id = $2 AND job_id = $3
  RETURNING *`, [ status, candidateId, jobId ])
  if(application.rows < 1){
    throw new Error('You are updating wrong application');
  }
};