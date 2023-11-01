import express from 'express';
import { validateSession } from '../middlewares/validateSession';

const router  = express.Router();

router.post('/auth/signin', validateSession);

export default router;