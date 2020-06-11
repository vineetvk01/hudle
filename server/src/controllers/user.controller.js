import { User } from '../User';
import { Candidate } from '../Candidate';
import { Recruiter } from '../Recruiter';
import { Company } from '../Company';


export const registerUser = async ({
  first_name,
  last_name,
  email,
  password,
  gender,
  type,
  company_name,
  industry,
  website,
  job_profile
}) => {
  try {
    const user = new User({
      firstName: first_name,
      lastName: last_name,
      email,
      password,
      gender,
      type
    });

    await user.save();
    
    if (user.getType() === 'candidate') {
      const candidate = new Candidate({
        user,
        jobProfile: job_profile
      })
      await candidate.save();
      return true;
    }

    if (user.getType() === 'recruiter') {
      const company = new Company({
        name: company_name,
        industry,
        website
      });

      await company.load();
      if (!company.id) {
        console.log(' This company is not in the database, saving now...')
        await company.save();
      }

      const recruiter = new Recruiter({
        user,
        company
      })

      recruiter.save();
      return true;
    }

    return false;

  } catch (e) {
    console.error(e);
    throw new Error('Unable to sign up the new user');
  }
};

export const fetchUser = (credentials) => {
  const user = User.fetch(credentials);
  return user;
};