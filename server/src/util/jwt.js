import jwt from 'jsonwebtoken';

export const name = 'session';
export const config = { maxAge: 86400000, httpOnly: true, };

export const tokenGenerator = (toBeSigned) => {
  return jwt.sign({ ...toBeSigned, }, process.env.JWT_KEY || 'MY_KEY');
};

export const verify = ( token ) => {
  return jwt.verify(token , process.env.JWT_KEY || 'MY_KEY');
}