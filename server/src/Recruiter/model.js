export default function buildMakeRecruiter() {
  return function Recruiter({
    id,
    user,
    company
  } = {}) {

    if( !user || !company){
      throw new Error('User or Company is not mapped to the recruiter');
    }

    this.id = id;
    this.getUser = () => user;
    this.getCompany = () => company;
  };
}