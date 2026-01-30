import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { createMessage, getConversation, getMessage, markSeen, deleteMessage } from '../controllers/message.controller.js';

const router = express.Router();

// Conversation routes (must come before '/:id')
router.get('/conversation/:userId', authMiddleware, getConversation);

router.post('/', authMiddleware, createMessage);
router.get('/:id', authMiddleware, getMessage);
router.put('/:id/seen', authMiddleware, markSeen);
router.delete('/:id', authMiddleware, deleteMessage);

export default router;

