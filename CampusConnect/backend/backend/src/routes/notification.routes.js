import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { createNotification, getUserNotifications, markSeen, markAllSeen, deleteNotification } from '../controllers/notification.controller.js';

const router = express.Router();

router.post('/', authMiddleware, createNotification);
router.get('/me', authMiddleware, getUserNotifications);
router.put('/:id/seen', authMiddleware, markSeen);
router.put('/me/seen', authMiddleware, markAllSeen);
router.delete('/:id', authMiddleware, deleteNotification);

export default router;
