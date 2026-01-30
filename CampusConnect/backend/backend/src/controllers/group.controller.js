import Group from '../models/Group.js';

export async function getAll(req, res) {
  try {
    const groups = await Group.find().populate('creator_id', 'full_name email');
    return res.status(200).json({ success: true, count: groups.length, data: groups });
  } catch (err) {
    console.error('Get all groups error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}

export async function getOne(req, res) {
  try {
    const group = await Group.findById(req.params.id).populate('creator_id', 'full_name email');
    if (!group) return res.status(404).json({ message: 'Group not found' });
    return res.status(200).json({ success: true, data: group });
  } catch (err) {
    console.error('Get group error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}

export async function createGroup(req, res) {
  try {
    const { name, description, category, privacy, image } = req.body;
    const creator_id = req.user?.id || req.body.creator_id;
    if (!name || !creator_id) return res.status(400).json({ message: 'Name and creator_id are required' });

    const group = new Group({ name, description, category, privacy, image, creator_id });
    await group.save();
    return res.status(201).json({ success: true, message: 'Group created', data: group });
  } catch (err) {
    console.error('Create group error:', err.message);
    if (err.name === 'ValidationError') return res.status(400).json({ message: err.message });
    return res.status(500).json({ message: 'Server Error' });
  }
}

export async function updateGroup(req, res) {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    const uid = req.user?.id;
    const role = req.user?.role;
    const allowedRoles = ['admin', 'super_admin', 'university_admin'];

    if (!uid) return res.status(401).json({ message: 'No token' });

    if (String(group.creator_id) !== String(uid) && !allowedRoles.includes(role)) {
      return res.status(403).json({ message: 'Forbidden: not group owner or admin' });
    }

    const updated = await Group.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json({ success: true, message: 'Group updated', data: updated });
  } catch (err) {
    console.error('Update group error:', err.message);
    if (err.name === 'ValidationError') return res.status(400).json({ message: err.message });
    return res.status(500).json({ message: 'Server Error' });
  }
}

export async function deleteGroup(req, res) {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    const uid = req.user?.id;
    const role = req.user?.role;
    const allowedRoles = ['admin', 'super_admin', 'university_admin'];

    if (!uid) return res.status(401).json({ message: 'No token' });

    if (String(group.creator_id) !== String(uid) && !allowedRoles.includes(role)) {
      return res.status(403).json({ message: 'Forbidden: not group owner or admin' });
    }

    const deleted = await Group.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: 'Group deleted' });
  } catch (err) {
    console.error('Delete group error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}
