import express from 'express';
import verifySession from '../middlewares/verifySession';
import { createChat, getChat } from '../controllers/chat';

const router  = express.Router();

router.post('/chat/new', verifySession, createChat);
router.get('/chat/:id', verifySession, getChat);

export default router;
