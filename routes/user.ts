import express from 'express';
import verifySession from '../middlewares/verifySession';
import { addContact, getProfile } from '../controllers/user';

const router  = express.Router();

router.get('/user/profile', verifySession, getProfile);
router.put('/user/add_contact', addContact);

export default router;
