export default function buildMakeCandidate() {
  return function Candidate({
    id,
    user,
    jobProfile
  } = {}) {

    if(!jobProfile || jobProfile.length === 0){
      console.log('this is the value ',jobProfile)
      throw new Error('Job Profile of the candidate is required');
    }

    this.id = id;
    this.getUser = () => user;
    this.getJobProfile = () => jobProfile;
  };
}