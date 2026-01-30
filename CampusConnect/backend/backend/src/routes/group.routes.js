// src/routes/group.routes.js
import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { getAll, getOne, createGroup, updateGroup, deleteGroup } from '../controllers/group.controller.js';
import { joinGroup, leaveGroup, getMembers } from '../controllers/groupMember.controller.js';

const router = express.Router();

router.get('/test', (req, res) => {
	res.json({ message: 'Group routes placeholder' });
});

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', authMiddleware, createGroup);
router.put('/:id', authMiddleware, updateGroup);
router.delete('/:id', authMiddleware, deleteGroup);

// membership endpoints
router.get('/:id/members', getMembers);
router.post('/:id/join', authMiddleware, joinGroup);
router.post('/:id/leave', authMiddleware, leaveGroup);

export default router;
