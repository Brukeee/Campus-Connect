// src/routes/auth.routes.js
import express from 'express';
import { login, register } from '../controllers/auth.controller.js';

const router = express.Router();
router.get('/test', (req, res) => res.json({ message: 'Auth routes OK' }));

router.post('/login', login);

// simple register placeholder if needed later
router.post('/register', register || ((req, res) => res.status(501).json({ message: 'Register not implemented' })));

export default router;