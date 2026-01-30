import GroupMember from '../models/GroupMember.js';
import User from '../models/user.js';

export async function joinGroup(req, res) {
  try {
    const groupId = req.params.id;
    const userId = req.user?.id || req.body.user_id;
    if (!userId) return res.status(400).json({ message: 'user_id required' });

    const membership = new GroupMember({ group_id: groupId, user_id: userId });
    await membership.save();
    const populated = await GroupMember.findById(membership._id).populate('user_id', 'full_name email profile_picture');
    return res.status(201).json({ success: true, message: 'Joined group', data: populated });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ message: 'Already a member' });
    console.error('Join group error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}

export async function leaveGroup(req, res) {
  try {
    const groupId = req.params.id;
    const userId = req.user?.id || req.body.user_id;
    if (!userId) return res.status(400).json({ message: 'user_id required' });

    const deleted = await GroupMember.findOneAndDelete({ group_id: groupId, user_id: userId });
    if (!deleted) return res.status(404).json({ message: 'Membership not found' });
    return res.status(200).json({ success: true, message: 'Left group' });
  } catch (err) {
    console.error('Leave group error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}

export async function getMembers(req, res) {
  try {
    const groupId = req.params.id;
    const members = await GroupMember.find({ group_id: groupId }).populate('user_id', 'full_name email profile_picture');
    return res.status(200).json({ success: true, count: members.length, data: members });
  } catch (err) {
    console.error('Get members error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}
