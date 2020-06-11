export default function buildMakeUser({ validation, sanitize, }) {
  return function User({
    id,
    firstName,
    lastName,
    email,
    password,
    gender,
    isActive = false,
    type,
    createdAt = Date.now(),
    lastLoginAt = Date.now(),
  } = {}) {
    const { isValidEmail, } = validation;

    if (!firstName) {
      throw new Error('First Name is required');
    }
    if (!lastName) {
      throw new Error('Last Name is required');
    }
    if (!email) {
      throw new Error('Email is required');
    }
    if (!isValidEmail(email)) {
      throw new Error('Email is invalid.');
    }

    if(!type){
      throw new Error('Type of user is required');
    }

    if(type !== 'recruiter' && type !== 'candidate' ){
      throw new Error('Invalid Type of user');
    }

    const sanitizedFirstName = sanitize(firstName).trim();
    const sanitizedLastName = sanitize(lastName).trim();
    const sanitizedEmail = sanitize(email).trim();
    if (sanitizedFirstName.length < 1 && sanitizedLastName.length < 1 && sanitizedEmail.length < 1) {
      throw new Error('Name or email contains no usable value.');
    }

    this.id = id;
    this.getFirstName = () => sanitizedFirstName;
    this.getLastName = () => sanitizedLastName;
    this.getCreatedAt = () => createdAt;
    this.getLastLoginAt = () => lastLoginAt;
    this.getEmail = () => sanitizedEmail;
    this.getPhone = () => phone;
    this.isActive = () => isActive;
    this.getPassword = () => password;
    this.getGender = () => gender;
    this.getType = () => type;
  };
}