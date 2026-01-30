// src/app.js
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import groupRoutes from './routes/group.routes.js';
import eventRoutes from './routes/event.routes.js';
import postRoutes from './routes/post.routes.js';
import messageRoutes from './routes/message.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import groupMessageRoutes from './routes/groupMessage.routes.js';
import adminRoutes from './routes/admin.routes.js';
import reportRoutes from './routes/report.routes.js';
import universityRoutes from './routes/university.routes.js'

import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

// Middlewares
app.use(helmet());
app.use(cors({ origin: 'http://localhost:5173' })); // ← change to your frontend URL / '*' for testing
app.use(express.json());
app.use('/uploads', express.static('public/uploads'));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

// Routes
app.use('/api/auth',   authRoutes);
app.use('/api/users',  userRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/group-messages', groupMessageRoutes);
app.use('/api/admin',  adminRoutes);
app.use('/api/report', reportRoutes);  // if exists
app.use('/api/university', universityRoutes);

// Error handler (last)
app.use(errorMiddleware);

// IMPORTANT: Do NOT put app.listen here
export default app;