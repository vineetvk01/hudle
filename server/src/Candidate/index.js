import buildMakeCandidate from './model';
import { User } from '../User';
import * as db from './db';

export const Candidate = buildMakeCandidate();
export const type_candidate = 'candidate';

Candidate.prototype.save = async function(){
  if(!this.id){
    const { id } = await db.insertCandidate({ 
      userId: this.getUser().id, 
      jobProfile: this.getJobProfile()
    });
    this.id = id;
  }else{
    console.log('need to be updated')
    // await db.update({
    //   userId: this.getUser().id, 
    //   jobProfile: this.getJobProfile()
    // })
  }
  
  if(this.skills && this.skills.length > 0){
    this.skills.forEach(async (skillId)=>{
      await db.addOrUpdateSkills({
        candidateId: this.id,
        skillId
      });
    })
  }
  console.log('New Candidate Added, id: ', this.id, ' , Linked with :', this.getUser().id);
  
}

Candidate.fromSession = async function(session){
  if(!session.type || session.type !== type_candidate ){
    throw new Error(' The user is not a candidate');
  }

  const { id, email, gender, type} = session;

  const user = new User({
    id,
    firstName: session.first_name,
    lastName: session.last_name,
    email,
    gender,
    createdAt: session.created_at,
    type
  });

  const candidate_db = await db.fetch({userId : user.id});
  if(!candidate_db){
    throw new Error('Not candidate linked with user id: ', user.id);
  }
  const candidate = new Candidate({
    id: candidate_db.id,
    user,
    jobProfile: candidate_db.job_profile,
  });

  const candidate_skills = await db.fetchSkills({userId: user.id});
  candidate.skills = candidate_skills;

  return candidate;
};
