import buildMakeCompany from './model';
import * as db from './db';

export const Company = buildMakeCompany();

Company.prototype.save = async function(){
  const { id } = await db.insert({ 
    name: this.getName(),
    industry: this.getIndustry(),
    website: this.getWebsite(),
    imageUrl: this.getImageUrl()
  });
  console.log('New Company inserted with ID :', id);
  this.id = id;
}

Company.prototype.load = async function(){
  const { id } = await db.select({ 
    name: this.getName(),
    website: this.getWebsite(),
  });
  if(id){
    console.log('Loaded company with ID :', id);
  }
  this.id = id;
}
