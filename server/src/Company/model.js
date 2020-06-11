export default function buildMakeCandidate() {
  return function Company({
    id,
    name,
    industry,
    website,
    imageUrl,
  } = {}) {

    if(!name || name.length === 0){
      throw new Error('Company Name is required');
    }

    if(!industry || industry.length === 0){
      throw new Error('Industry is required');
    }

    if(!website || website.length === 0){
      throw new Error('Website is required');
    }

    this.id = id;
    this.getName = () => name;
    this.getIndustry = () => industry;
    this.getWebsite = () => website;
    this.getImageUrl = () => imageUrl;
  };
}