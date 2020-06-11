import pool from './default';
import path from 'path';
import fs from 'fs';

const isDbIntialized = async () => {
  try {
    const { rows } = await pool.query('SELECT * FROM dbstatus WHERE name = \'init\'');
    if (!rows) {
      return false;
    }
    const { status } = rows[0];
    if(parseInt(status) === 1){
      console.log('Database is already initialized')
      return true;
    }
    return false;
  } catch (e) {
    console.log('Database is not initialized..');
    return false;
  }
}

export const initializeDB = async () => {
  try {
    console.log('Checking whether database is initialized !');
    if (!await isDbIntialized()) {
      console.log('Going to initialize database...');
      await pool.query(`SET timezone = 'Asia/Kolkata';`);
      await pool.query('CREATE TABLE IF NOT EXISTS dbstatus( id serial PRIMARY KEY, name VARCHAR (50) UNIQUE NOT NULL, status VARCHAR (50) NOT NULL);');
      await pool.query('CREATE TABLE IF NOT EXISTS login( id serial PRIMARY KEY, first_name VARCHAR (50) NOT NULL, last_name VARCHAR (50), email VARCHAR (50) NOT NULL, password VARCHAR (300) NOT NULL, gender VARCHAR (10) NOT NULL, is_active boolean, profile_image VARCHAR (100), kind VARCHAR (10), created_at TIMESTAMPTZ NOT NULL, last_login_at TIMESTAMPTZ NOT NULL);');
      await pool.query('CREATE TABLE IF NOT EXISTS candidate( id serial PRIMARY KEY, login_id integer NOT NULL, job_profile VARCHAR(50));');
      await pool.query('CREATE TABLE IF NOT EXISTS recruiter( id serial PRIMARY KEY, login_id integer NOT NULL, company_id integer NOT NULL);');
      await pool.query('CREATE TABLE IF NOT EXISTS company( id serial PRIMARY KEY, name VARCHAR(50) NOT NULL, industry VARCHAR(50) NOT NULL, website VARCHAR(50) NOT NULL, image_url VARCHAR(50) );');
      await pool.query('CREATE TABLE IF NOT EXISTS skills( id serial PRIMARY KEY, name VARCHAR(50) NOT NULL );');
      await pool.query('CREATE TABLE IF NOT EXISTS candidate_skills( candidate_id integer NOT NULL, skill_id integer NOT NULL);');
      await pool.query('CREATE TABLE IF NOT EXISTS job( id serial PRIMARY KEY, title VARCHAR (50) NOT NULL, location VARCHAR (50), job_profile VARCHAR (50), job_description TEXT, is_active boolean NOT NULL, managed_by integer NOT NULL, posted_on TIMESTAMPTZ);');
      await pool.query('CREATE TABLE IF NOT EXISTS job_skills( job_id integer NOT NULL, skill_id integer NOT NULL);');
      await pool.query('CREATE TABLE IF NOT EXISTS candidate_job( candidate_id integer NOT NULL, job_id integer NOT NULL, status VARCHAR (15) NOT NULL, applied_on TIMESTAMPTZ, PRIMARY KEY(candidate_id, job_id ));');
      await pool.query('INSERT INTO dbstatus (name, status) VALUES (\'init\', 1)');
      await initializeSkills();
      await initializeCandidates();
      await initializeCompanies();
      await initializeRecruiters();
      await initializeJobs();
      console.log('✔️✔️✔️✔️ Data initialized !!');
      console.log('🚧 Altering the sequence !!');
      await pool.query('ALTER SEQUENCE job_id_seq RESTART WITH 1000');
      await pool.query('ALTER SEQUENCE login_id_seq RESTART WITH 1000');
      await pool.query('ALTER SEQUENCE candidate_id_seq RESTART WITH 1000');
      await pool.query('ALTER SEQUENCE recruiter_id_seq RESTART WITH 1000');
      await pool.query('ALTER SEQUENCE company_id_seq RESTART WITH 1000');
      await pool.query('ALTER SEQUENCE company_id_seq RESTART WITH 1000');
      console.log('✔️✔️✔️✔️ Sequence altered !!');
    }
  } catch (err) {
    console.log('Error while initializing the database');
    console.error(err);
    await resetDatabase();
  }
}

export const initializeSkills = async () => {
  console.log('🚧 Skills -> Initializing');
  const skills_json = fs.readFileSync(path.join(__dirname, 'skills.json'), {encoding:'utf8', flag:'r'});
  const skills = JSON.parse(skills_json);
  skills.forEach(async(skill) => {
    await pool.query('INSERT INTO skills (id, name) VALUES ($1, $2)', [
      skill.id,
      skill.name
    ]);
  })
  console.log('✔️  Skills -> Initialized');
}

export const initializeCandidates = async () => {
  console.log('🚧 Candidates -> Initializing')
  const candidates_json = fs.readFileSync(path.join(__dirname, 'candidates.json'), {encoding:'utf8', flag:'r'});
  const candidates = JSON.parse(candidates_json);
  candidates.forEach(async(candidate) =>{
    const { user } = candidate;
    await pool.query('INSERT INTO login (id, first_name, last_name, email, password, gender, kind, is_active, created_at, last_login_at ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
    [
      user.id,
      user.first_name,
      user.last_name,
      user.email,
      user.password,
      user.gender,
      'candidate',
      user.is_active,
      new Date(Date.now()).toUTCString(),
      new Date(Date.now()).toUTCString()
    ]);
    const { candidate : _candidate } = candidate;
    await pool.query('INSERT INTO candidate (id, login_id, job_profile ) VALUES ($1, $2, $3)',
    [
      _candidate.id,
      user.id,
      _candidate.job_profile,
    ]);

    const { skills } = candidate;
    skills.forEach(async(skillId)=>{
      await pool.query('INSERT INTO candidate_skills (candidate_id, skill_id ) VALUES ($1, $2)',
    [
      _candidate.id,
      skillId
    ]);
    })
    
  })
  console.log('✔️  Candidates -> Initialized')
} 

export const initializeCompanies = async () => {
  console.log('🚧 Company -> Initializing')
  const companies_json = fs.readFileSync(path.join(__dirname, 'companies.json'), {encoding:'utf8', flag:'r'});
  const companies = JSON.parse(companies_json);
  companies.forEach(async(company) =>{
    await pool.query('INSERT INTO company (id, name, industry, website, image_url) VALUES ($1, $2, $3, $4, $5)',
    [
      company.id,
      company.name,
      company.industry,
      company.website,
      company.image_url,
    ]);
  })
  console.log('✔️ Company -> Initialized')
}

export const initializeRecruiters = async () => {
  console.log('🚧 Recruiters -> Initializing')
  const recruiters_json = fs.readFileSync(path.join(__dirname, 'recruiters.json'), {encoding:'utf8', flag:'r'});
  const recruiters = JSON.parse(recruiters_json);
  recruiters.forEach(async(recruiter) =>{
    const { user } = recruiter;
    await pool.query('INSERT INTO login (id, first_name, last_name, email, password, gender, kind, is_active, created_at, last_login_at ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
    [
      user.id,
      user.first_name,
      user.last_name,
      user.email,
      user.password,
      user.gender,
      'recruiter',
      user.is_active,
      new Date(Date.now()).toUTCString(),
      new Date(Date.now()).toUTCString()
    ]);
    const { recruiter : _recruiter } = recruiter;
    await pool.query('INSERT INTO recruiter (id, login_id, company_id ) VALUES ($1, $2, $3)',
    [
      _recruiter.id,
      user.id,
      _recruiter.company_id,
    ]);
  })
  console.log('✔️ Recruiters -> Initialized')
}

export const initializeJobs = async () => {
  console.log('🚧 Jobs -> Initializing')
  const jobs_json = fs.readFileSync(path.join(__dirname, 'jobs.json'), {encoding:'utf8', flag:'r'});
  const jobs = JSON.parse(jobs_json);
  jobs.forEach(async(job)=>{
    await pool.query('INSERT INTO job (id, title, location, job_profile, job_description, is_active, managed_by, posted_on  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
    [
      job.id,
      job.title,
      job.location,
      job.job_profile,
      job.description,
      job.is_active,
      job.managed_by,
      new Date(Date.now()).toUTCString()
    ]);
  })
  console.log('✔️ Jobs -> Initialized')
}

export const resetDatabase = async () => {
  console.log('Going to reset the database');
  const allTables = ['dbstatus', 'login', 'candidate', 'recruiter', 'company', 'skills', 'candidate_skills', 'job', 'job_skills', 'candidate_job']
  allTables.forEach(async (value) => {
    console.log('Going to delete table : ', value)
    await pool.query(`DROP TABLE ${value}`);
  });
}