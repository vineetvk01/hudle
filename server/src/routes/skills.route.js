import express from 'express';
import { fetchSkills } from '../Skills';

const router = express.Router();

router.get('/all', async (req, res) => {
  const { user } = req;
  const skills = await fetchSkills();
  res.status(200).send({ skills });
});


export default router;
