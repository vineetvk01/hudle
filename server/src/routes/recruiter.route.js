import express from 'express';
import { mustLogin } from '../middleware/authentication';
import { Recruiter } from '../Recruiter';
import { Job } from '../Job';

const router = express.Router();

router.use(mustLogin);

router.get('/jobs', async (req, res) => {
  try{
    console.log('Getting all the job posted by the recruiter');
    const { user } = req;
    const recruiter = await Recruiter.fromSession(user);

    const jobs = await Job.fetchAll({
      recruiter
    });

    res.send({
      status: 'success',
      jobs
    });
  }catch(error){
    res.status(400).send({
      status: 'success',
      message: error.message
    })
  }
});

router.put('/job/:jobId', async (req, res) => {
  try{
    console.log('Getting all the job posted by the recruiter');
    const { user, body: {active} } = req;
    const { jobId } = req.params;
    const recruiter = await Recruiter.fromSession(user);

    const jobs = await Job.update({
      recruiter,
      jobId,
      active
    });

    res.send({
      status: 'success',
      jobs
    });
  }catch(error){
    res.status(400).send({
      status: 'success',
      message: error.message
    })
  }
});

router.post('/job/add', async (req, res) => {
  try {
    console.log('Adding new skills');
    const { body: {
      job_title,
      location,
      job_profile,
      job_description,
      is_active
    }, user } = req;
    const recruiter = await Recruiter.fromSession(user);
    const job = new Job({
      title: job_title,
      location,
      jobProfile: job_profile,
      jobDescription: job_description,
      isActive: is_active,
      managedBy: recruiter,
    });

    console.log(job.getPostedOn())
    await job.save();
    res.send({
      status: 'success',
      message: 'Job successfully added',
      id: job.id
    });
  } catch (error) {
    console.log(error)
    res.status(400).send({
      status: 'failure',
      message: error.message
    })
  }
})

router.get('/applications', async (req, res) => {
  try{
  console.log('All the applications received by the company');
  const { user } = req;
  const recruiter = await Recruiter.fromSession(user);

  const applications = await Job.getAllApplications({recruiter});
  res.status(200).send({
    status: 'success',
    applications
  })
  }catch( error ){
    res.status(400).send({
      status: 'failure',
      message: error.message
    });
  }
});

router.put('/application/:jobId/:candidateId', async(req, res)=>{
  console.log('Updating a job application status');
  try{
  const { user, body: { status } } = req;
  const { jobId, candidateId } = req.params;
  const recruiter = await Recruiter.fromSession(user);

  const updated = await Job.updateApplicationStatus({recruiter, jobId, candidateId, status});

  res.send({
    status: 'success',
    updated
  })
  }catch(error){
    res.status(400).send({
      status: 'failure',
      message: error.message
    })
  }

});

export default router;