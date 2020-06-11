export default function buildMakeJob() {
  return function Job({
    id,
    title,
    location,
    jobProfile,
    jobDescription,
    isActive = true,
    managedBy,
    postedOn = Date.now(),
  } = {}) {

    if (!title) {
      throw new Error('Title is required');
    }
    if (!location) {
      throw new Error('Location is required');
    }
    if (!jobProfile) {
      throw new Error('Job Profile is required');
    }
    if (!managedBy) {
      throw new Error('Recruiter is required.');
    }

    this.id = id;
    this.getTitle = () => title;
    this.getLocation = () => location;
    this.getJobProfile = () => jobProfile;
    this.getJobDescription = () => jobDescription;
    this.getIsActive = () => isActive;
    this.getManagedBy = () => managedBy;
    this.getPostedOn = () => postedOn;
  };
}