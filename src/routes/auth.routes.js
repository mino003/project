import express from 'express';
import AuthController from '../controllers/auth.controller.js';
import { validateRequest } from '../utils/validation.js';
import { userSchema } from '../utils/validation.js';

const router = express.Router();

router.post('/register', validateRequest(userSchema), AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', AuthController.getCurrentUser);

export default router;