import Event from '../models/Event.js';

// Get all events (optionally filter by category or date)
export async function getAllEvents(req, res) {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.date) filter.date = new Date(req.query.date);
    const events = await Event.find(filter).populate('creator_id', 'full_name email');
    return res.status(200).json({ success: true, count: events.length, data: events });
  } catch (err) {
    console.error('Get events error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}

export async function getEvent(req, res) {
  try {
    const ev = await Event.findById(req.params.id).populate('creator_id', 'full_name email');
    if (!ev) return res.status(404).json({ message: 'Event not found' });
    return res.status(200).json({ success: true, data: ev });
  } catch (err) {
    console.error('Get event error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}

export async function createEvent(req, res) {
  try {
    const { title, description, date, time, category, location, attendance, organizer, image } = req.body;
    const creator_id = req.user?.id || req.body.creator_id;
    if (!title || !date || !creator_id) return res.status(400).json({ message: 'title, date, and creator_id required' });

    const ev = new Event({ title, description, date: new Date(date), time, category, location, attendance, organizer, image, creator_id });
    await ev.save();
    return res.status(201).json({ success: true, data: ev });
  } catch (err) {
    console.error('Create event error:', err.message);
    if (err.name === 'ValidationError') return res.status(400).json({ message: err.message });
    return res.status(500).json({ message: 'Server Error' });
  }
}

export async function updateEvent(req, res) {
  try {
    const ev = await Event.findById(req.params.id);
    if (!ev) return res.status(404).json({ message: 'Event not found' });

    const uid = req.user?.id;
    const role = req.user?.role;
    const allowedRoles = ['admin', 'super_admin', 'university_admin'];
    if (!uid) return res.status(401).json({ message: 'No token' });
    if (String(ev.creator_id) !== String(uid) && !allowedRoles.includes(role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json({ success: true, data: updated });
  } catch (err) {
    console.error('Update event error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}

export async function deleteEvent(req, res) {
  try {
    const ev = await Event.findById(req.params.id);
    if (!ev) return res.status(404).json({ message: 'Event not found' });

    const uid = req.user?.id;
    const role = req.user?.role;
    const allowedRoles = ['admin', 'super_admin', 'university_admin'];
    if (!uid) return res.status(401).json({ message: 'No token' });
    if (String(ev.creator_id) !== String(uid) && !allowedRoles.includes(role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await Event.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: 'Event deleted' });
  } catch (err) {
    console.error('Delete event error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}
