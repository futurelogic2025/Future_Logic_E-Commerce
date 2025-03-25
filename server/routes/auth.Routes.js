import { Router } from 'express';
import { signOut } from '../controllers/auth.Controller.js';
import { signIn } from '../controllers/user.Controller.js';

const router = Router();

// User sign-in (generate JWT)
router.post('/signin', signIn);

// User sign-out (invalidate JWT client-side, optional)
router.post('/signout', signOut);

export default router;
