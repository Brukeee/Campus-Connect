import Event from '../models/Event.js';
import EventRSVP from '../models/EventRSVP.js';

export async function rsvpEvent(req, res) {
  try {
    const eventId = req.params.id;
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'No token' });

    const ev = await Event.findById(eventId);
    if (!ev) return res.status(404).json({ message: 'Event not found' });

    const rsvp = new EventRSVP({ event_id: eventId, user_id: userId });
    await rsvp.save();
    return res.status(201).json({ success: true, data: rsvp });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ message: 'Already RSVPed' });
    console.error('RSVP error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}

export async function cancelRsvp(req, res) {
  try {
    const eventId = req.params.id;
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'No token' });

    const removed = await EventRSVP.findOneAndDelete({ event_id: eventId, user_id: userId });
    if (!removed) return res.status(404).json({ message: 'RSVP not found' });
    return res.status(200).json({ success: true, message: 'RSVP cancelled' });
  } catch (err) {
    console.error('Cancel RSVP error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}

export async function getEventRsvps(req, res) {
  try {
    const eventId = req.params.id;
    const list = await EventRSVP.find({ event_id: eventId }).populate('user_id', 'full_name email');
    return res.status(200).json({ success: true, count: list.length, data: list });
  } catch (err) {
    console.error('Get RSVPs error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}

export async function getUserRsvps(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'No token' });
    const list = await EventRSVP.find({ user_id: userId }).populate('event_id');
    return res.status(200).json({ success: true, count: list.length, data: list });
  } catch (err) {
    console.error('Get user RSVPs error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}
