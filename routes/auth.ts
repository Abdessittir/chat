import express from 'express';
import { signin, signout, signup } from '../controllers/auth';

const router  = express.Router();

router.post('/auth/signin', signin);
router.post('/auth/signup', signup);
router.delete('/auth/signout', signout);

export default router;