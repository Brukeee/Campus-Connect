import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { createGroupMessage, getMessagesByGroup, deleteGroupMessage } from '../controllers/groupMessage.controller.js';

const router = express.Router();

router.get('/group/:id', getMessagesByGroup);
router.post('/', authMiddleware, createGroupMessage);
router.delete('/:id', authMiddleware, deleteGroupMessage);

export default router;
