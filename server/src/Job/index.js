import buildMakeJob from './model';
import * as db from './db';

export const Job = buildMakeJob();

Job.prototype.save = async function () {
  const { id } = await db.insert({
    title: this.getTitle(),
    location: this.getLocation(),
    jobProfile: this.getJobProfile(),
    jobDescription: this.getJobDescription(),
    isActive: this.getIsActive(),
    postedOn: new Date(this.getPostedOn()).toUTCString(),
    managedBy: this.getManagedBy().id
  });
  this.id = id;
}

Job.fetchJobs = async function ({ candidate }) {
  const jobProfile = candidate.getJobProfile();
  console.log('Fetching job for Job Profile: ', jobProfile)
  console.log('Fetching job for Job Skills: ', candidate.skills);
  return db.fetchJobs({ jobProfile, skills: candidate.skills });
}

Job.applyJob = async function ({ candidate, jobId }) {
  console.log(candidate);
  console.log(jobId);
  return db.applyJob({
    candidateId: candidate.id,
    jobId,
    appliedOn: Date.now()
  });
}

Job.fetchAppliedJobs = async function ({ candidate, status }) {
  console.log(candidate);
  console.log('Fetching job and status for the candidate with Id : ', candidate.id);
  return db.fetchAppliedJobs({ candidateId: candidate.id, status })
}

Job.fetchAll = async function ({ recruiter }) {
  return db.fetchJobsFromManagedBy({ managedBy: recruiter.id })
}

Job.update = async function({
  recruiter,
  jobId,
  active
}) {
  return db.updateJobStatus({ jobId, managedBy : recruiter.id, active})
}

Job.getAllApplications = async function ({recruiter}){
  return db.getAllApplications({managedBy : recruiter.id});
}

Job.updateApplicationStatus = async function ({recruiter, jobId, candidateId, status}){
  return db.updateApplicationStatus({jobId, candidateId, status});
} 