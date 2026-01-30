import Notification from '../models/Notification.js';

export async function createNotification(req, res) {
  try {
    const { user_id, type, content } = req.body;
    if (!user_id || !type || !content) return res.status(400).json({ message: 'user_id, type and content required' });
    const n = new Notification({ user_id, type, content });
    await n.save();
    return res.status(201).json({ success: true, data: n });
  } catch (err) {
    console.error('Create notification error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}

export async function getUserNotifications(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'No token' });
    const list = await Notification.find({ user_id: userId }).sort({ timestamp: -1 });
    return res.status(200).json({ success: true, count: list.length, data: list });
  } catch (err) {
    console.error('Get notifications error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}

export async function markSeen(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'No token' });
    const notif = await Notification.findById(req.params.id);
    if (!notif) return res.status(404).json({ message: 'Notification not found' });
    if (String(notif.user_id) !== String(userId)) return res.status(403).json({ message: 'Forbidden' });
    notif.seen = true;
    await notif.save();
    return res.status(200).json({ success: true, data: notif });
  } catch (err) {
    console.error('Mark seen error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}

export async function markAllSeen(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'No token' });
    await Notification.updateMany({ user_id: userId, seen: false }, { seen: true });
    return res.status(200).json({ success: true, message: 'All notifications marked seen' });
  } catch (err) {
    console.error('Mark all seen error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}

export async function deleteNotification(req, res) {
  try {
    const userId = req.user?.id;
    const role = req.user?.role;
    if (!userId) return res.status(401).json({ message: 'No token' });
    const notif = await Notification.findById(req.params.id);
    if (!notif) return res.status(404).json({ message: 'Notification not found' });
    const allowed = ['admin', 'super_admin', 'university_admin'];
    if (String(notif.user_id) !== String(userId) && !allowed.includes(role)) return res.status(403).json({ message: 'Forbidden' });
    await Notification.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: 'Notification deleted' });
  } catch (err) {
    console.error('Delete notification error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}
