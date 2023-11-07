import express from 'express';
import verifySession from '../middlewares/verifySession';
import { getProfile } from '../controllers/user';

const router  = express.Router();

router.get('/user/profile', verifySession, getProfile);

export default router;
