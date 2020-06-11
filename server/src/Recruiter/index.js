import buildMakeRecruiter from './model';
import * as db from './db';
import { User } from '../User';
import { Company } from '../Company';

export const Recruiter = buildMakeRecruiter();
export const type_recruiter = 'recruiter';

Recruiter.prototype.save = async function(){
  const { id } = await db.insert({ 
    userId: this.getUser().id, 
    companyId: this.getCompany().id,
  });
  console.log('New Recruiter is added with ID: ', id);
  this.id = id;
}

Recruiter.fromSession = async function(session){
  if(!session.type || session.type !== type_recruiter ){
    throw new Error(' The user is not a recruiter');
  }

  const { id, email, gender, type } = session;
  
  const user = new User({
    id,
    firstName: session.first_name,
    lastName: session.last_name,
    email,
    gender,
    createdAt: session.created_at,
    type
  });

  const recruiter_db = await db.fetch({userId : user.id});
  if(!recruiter_db){
    throw new Error('Not candidate linked with user id: ', user.id);
  }
  const company = new Company({
    id: recruiter_db.company_id,
    name: recruiter_db.name,
    industry: recruiter_db.industry,
    website: recruiter_db.website,
    imageUrl: recruiter_db.image_url,
  });

  const recruiter = new Recruiter({
    id: recruiter_db.recruiter_id,
    user,
    company
  });

  return recruiter;
};
