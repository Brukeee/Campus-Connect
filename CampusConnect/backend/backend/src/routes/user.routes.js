// src/routes/user.routes.js
import express from 'express';
import { getAll, getUser, createUser, updateUser, deleteUser } from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/test', (req, res) => {
	res.json({ message: 'User routes placeholder' });
});

router.get('/', getAll);
router.get('/:id', getUser);
router.post('/', createUser); //! N.B after test add authMiddleware
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);

export default router;
