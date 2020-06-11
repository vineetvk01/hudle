import express from 'express';
import { mustLogin } from '../middleware/authentication';
import { Candidate } from '../Candidate';
import { Job } from '../Job';

const router = express.Router();

router.use(mustLogin);

router.post('/skills', async (req, res) => {
  console.log('Adding new skills');
  const { body: { skills }, user } = req;
  const candidate = await Candidate.fromSession(user);
  candidate.skills = skills;
  await candidate.save();
  res.sendStatus(200);
})

router.get('/jobs', async (req, res) => {
  const { body, user } = req;
  const candidate = await Candidate.fromSession(user);
  console.log('Searching new jobs for the candidate : ', candidate.id);
  const jobs = await Job.fetchJobs({ candidate });
  res.send({
    status: 'success',
    jobs
  });
})

router.get('/jobs/applied', async (req, res) => {
  const { body, user } = req;
  const candidate = await Candidate.fromSession(user);
  console.log('Getting applied jobs: ', candidate.id);
  const jobs = await Job.fetchAppliedJobs({ candidate });
  res.send({
    status: 'success',
    jobs
  });
})

router.post('/jobs/:jobId/apply', async (req, res) => {
  try {
    const { body, user } = req;
    const { jobId } = req.params;
    const candidate = await Candidate.fromSession(user);
    console.log('Candidate with Job Id : ', candidate.id, ' Applying for job : ', jobId);
    const applied = await Job.applyJob({ candidate, jobId });
    res.send({
      status: 'success',
      applied
    });
  }catch(error){
    console.error(error);
    res.status(400).send({
      status: 'failure',
      message: 'You must have already applied for this job',
      error: error.message
    });
  }
})

export default router;