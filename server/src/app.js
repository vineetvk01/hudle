import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';

import { authentication } from './middleware/authentication';
import { initializeDB } from './db/initialize';
import userRoute from './routes/user.route';
import candidateRoute from './routes/candidate.route';
import recruiterRoute from './routes/recruiter.route';
import skillsRoute from './routes/skills.route';
import dbRoute from './routes/db.route';

const app = express();


dotenv.config();
initializeDB();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header(
    'Access-Control-Allow-Methods',
    'GET,PUT,POST,DELETE,UPDATE,OPTIONS'
  );
  res.header('Access-Control-Allow-Headers', 'Content-Type, *');
  next();
});

app.use(authentication);

app.use('/api/user', userRoute);
app.use('/api/candidate', candidateRoute);
app.use('/api/recruiter', recruiterRoute);
app.use('/api/skills', skillsRoute);
app.use('/api/db', dbRoute);

app.get('/', async (request, response) => {
  try{
    initializeDB();
  }catch(err){
    console.log(err)
  } 
  response.sendStatus(202);
})


app.use(function (req, res, next) {
  res.status(404);
  // respond with json
  if (req.accepts('json')) {
    res.send({ status: '404', error: 'Not found', });
    return;
  }
  next();
});

export default app;