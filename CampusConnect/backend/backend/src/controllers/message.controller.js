import Message from '../models/Message.js';

export async function createMessage(req, res) {
  try {
    const sender_id = req.user?.id;
    if (!sender_id) return res.status(401).json({ message: 'No token' });

    const { receiver_id, message: text, file_path } = req.body;
    if (!receiver_id || (!text && !file_path)) return res.status(400).json({ message: 'receiver_id and message or file required' });

    const msg = new Message({ sender_id, receiver_id, message: text, file_path });
    await msg.save();
    return res.status(201).json({ success: true, data: msg });
  } catch (err) {
    console.error('Create message error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}

export async function getConversation(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'No token' });
    const otherId = req.params.userId;

    const msgs = await Message.find({
      $or: [
        { sender_id: userId, receiver_id: otherId },
        { sender_id: otherId, receiver_id: userId }
      ]
    }).sort({ timestamp: 1 });

    return res.status(200).json({ success: true, count: msgs.length, data: msgs });
  } catch (err) {
    console.error('Get conversation error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}

export async function getMessage(req, res) {
  try {
    const msg = await Message.findById(req.params.id);
    if (!msg) return res.status(404).json({ message: 'Message not found' });
    return res.status(200).json({ success: true, data: msg });
  } catch (err) {
    console.error('Get message error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}

export async function markSeen(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'No token' });

    const msg = await Message.findById(req.params.id);
    if (!msg) return res.status(404).json({ message: 'Message not found' });
    if (String(msg.receiver_id) !== String(userId)) return res.status(403).json({ message: 'Only receiver can mark seen' });

    msg.seen = true;
    await msg.save();
    return res.status(200).json({ success: true, data: msg });
  } catch (err) {
    console.error('Mark seen error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}

export async function deleteMessage(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'No token' });

    const msg = await Message.findById(req.params.id);
    if (!msg) return res.status(404).json({ message: 'Message not found' });
    const role = req.user?.role;
    const allowedRoles = ['admin', 'super_admin', 'university_admin'];
    if (String(msg.sender_id) !== String(userId) && !allowedRoles.includes(role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await Message.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: 'Message deleted' });
  } catch (err) {
    console.error('Delete message error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}
