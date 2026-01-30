import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { getMyPosts, getPostsByUser,} from '../controllers/post.controller.js';
import { getAllPosts, getPost, createPost, updatePost, deletePost } from '../controllers/post.controller.js';


const router = express.Router();

// Routes for user's posts must come before '/:id'
router.get('/me', authMiddleware, getMyPosts);// for users to find their own posts
router.get('/user/:userId', getPostsByUser);// for admins to search by user

router.get('/', getAllPosts);
router.get('/:id', getPost);
router.post('/', authMiddleware, createPost);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);

export default router;
