// src/routes/admin.routes.js
import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { test, listUsers, approveUser } from '../controllers/admin.controller.js';

const router = express.Router();

// simple health check
router.get('/test', authMiddleware, test);

// list users (admin)
router.get('/users', authMiddleware, listUsers);

// approve a user (set status to 'approved')
router.patch('/users/:id/approve', authMiddleware, approveUser);

export default router;
