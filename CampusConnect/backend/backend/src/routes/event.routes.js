// src/routes/event.routes.js
import express from 'express';
import { getAllEvents, getEvent, createEvent, updateEvent, deleteEvent } from '../controllers/event.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import { rsvpEvent, cancelRsvp, getEventRsvps, getUserRsvps } from '../controllers/eventRsvp.controller.js';

const router = express.Router();

router.get('/', getAllEvents);
router.get('/:id', getEvent);
router.post('/', authMiddleware, createEvent);// NB '//'=> enter authmiddleware after testing
router.put('/:id', authMiddleware, updateEvent);//
router.delete('/:id', authMiddleware, deleteEvent);//

// RSVP endpoints
router.get('/me/rsvps', authMiddleware, getUserRsvps);// get all events the user RSVPd
router.get('/:id/rsvps', getEventRsvps);
router.post('/:id/rsvp', authMiddleware, rsvpEvent);
router.delete('/:id/rsvp', authMiddleware, cancelRsvp);

export default router;
