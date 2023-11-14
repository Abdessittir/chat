import express from 'express';
import verifySession from '../middlewares/verifySession';
import { createChat } from '../controllers/chat';

const router  = express.Router();

router.post('/chat/new', verifySession, createChat);

export default router;
