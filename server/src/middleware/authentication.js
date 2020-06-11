import { name as cookieName, verify } from '../util/jwt';

export const authentication = async (req, res, next) => {
  try {
    if (req.headers.cookie) {
      const cookieArray = req.headers.cookie
        .split(';')
        .filter((cookie) => cookie.indexOf(cookieName) !== -1);
      if (cookieArray.length > 0) {
        console.log(cookieName, ' is attached to the request')
        const token = cookieArray[0].split('=')[1];

        if (!token) {
          console.log('No value for the token');
        } else {
          const data = await verify(token);
          req.user = data;
          console.log('User is attached and verified');
        }
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    next();
  }
}

export const mustLogin = (req, res, next) => {
  const { user } = req;
  if (user) {
    next();
  } else {
    res.status(401).send({
      status: 'failure',
      message: 'you must be logged in to access this'
    })
  }
}