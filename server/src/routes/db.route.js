import express from 'express';
import { resetDatabase } from '../db/initialize';

const router = express.Router();

router.get('/delete', async (req, res) => {
  await resetDatabase();
  res.sendStatus(200);
});

export default router;
