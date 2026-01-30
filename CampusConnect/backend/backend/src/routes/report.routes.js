// src/routes/report.routes.js
import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { createReport, getAllReports, getReport, updateReportStatus } from '../controllers/report.controller.js';

const router = express.Router();

router.post('/', authMiddleware, createReport);
router.get('/', authMiddleware, getAllReports);
router.get('/:id', authMiddleware, getReport);
router.put('/:id/status', authMiddleware, updateReportStatus);

export default router;
