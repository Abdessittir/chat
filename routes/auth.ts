import express from 'express';
import { validateSession } from '../middlewares/validateSession';
import { signup } from '../controllers/auth';

const router  = express.Router();

router.post('/auth/signin', validateSession);
router.post('/auth/signup', signup);

export default router;