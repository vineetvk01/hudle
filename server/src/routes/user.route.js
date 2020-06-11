import express from 'express';
import { registerUser, fetchUser } from '../controllers/user.controller';
import { tokenGenerator, name as cookieName, config } from '../util/jwt';

const router = express.Router();

router.get('/me', (req, res) => {
  const { user } = req;
  res.status(200).send(user);
});


router.post('/login', async (req, res) => {
  try {
    const { body } = req;
    const { email, password } = body;
    if (!email || !password) {
      res.status(400).send({
        status: 'failure',
        message: 'Please provide both email and password.'
      });
    }

    const user = await fetchUser({ email, password });
    if(!user.id){
      throw new Error('User is not found');
    }

    console.log('Logged in user: ', user);

    const signedUser = tokenGenerator(user)

    res.cookie(cookieName, signedUser , config);
    res.status(200).send({
      status:'success',
      message: 'Logged in successfully.',
      user
    })

  } catch (err) {
    console.error(err)
    res.status(400).send({
      status: 'failure',
      message: 'Please check email & password.'
    });
  }
});


router.post('/signup', async (req, res) => {
  try {
    const { body } = req;
    const { first_name, last_name, email, password, gender, type, company_name = '', industry = '', website = '', job_profile } = body;
    if (!first_name || !last_name || !email || !password || !type) {
      res.status(400).send({
        status: 'failure',
        message: 'Missing required fields'
      });
    }
    const registered = await registerUser({ first_name, last_name, email, password, gender, type, company_name, industry, website, job_profile });
    if (registered) {
      res.status(201).send({
        status: 'success',
        message: 'Successfully Signed up in the platform'
      })
    }

  } catch (error) {
    res.sendStatus(500);
  }
});

router.post('/logout', (req, res) => {
  console.log('Logout request received');
  res.clearCookie(cookieName, { });
  res.sendStatus(200);
});

export default router;
