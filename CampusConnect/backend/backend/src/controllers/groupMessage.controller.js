import GroupMessage from '../models/GroupMessage.js';
import Group from '../models/Group.js';

// Create a group message
export async function createGroupMessage(req, res) {
  try {
    const { group_id, message, file_path } = req.body;
    const user_id = req.user?.id || req.body.user_id;
    if (!group_id || !message) return res.status(400).json({ message: 'group_id and message are required' });

    // optional: verify group exists
    const group = await Group.findById(group_id);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    const gm = new GroupMessage({ group_id, user_id, message, file_path });
    await gm.save();
    const populated = await GroupMessage.findById(gm._id).populate('user_id', 'full_name email profile_picture');
    return res.status(201).json({ success: true, data: populated });
  } catch (err) {
    console.error('Create group message error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}

// Get messages for a group
export async function getMessagesByGroup(req, res) {
  try {
    const groupId = req.params.id;
    const msgs = await GroupMessage.find({ group_id: groupId }).populate('user_id', 'full_name profile_picture');
    return res.status(200).json({ success: true, count: msgs.length, data: msgs });
  } catch (err) {
    console.error('Get group messages error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}

// Delete message (sender or admin)
export async function deleteGroupMessage(req, res) {
  try {
    const msg = await GroupMessage.findById(req.params.id);
    if (!msg) return res.status(404).json({ message: 'Message not found' });

    const uid = req.user?.id;
    const role = req.user?.role;
    const allowedRoles = ['admin', 'super_admin', 'university_admin'];

    if (!uid) return res.status(401).json({ message: 'No token' });
    if (String(msg.user_id) !== String(uid) && !allowedRoles.includes(role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await GroupMessage.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: 'Message deleted' });
  } catch (err) {
    console.error('Delete group message error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}
