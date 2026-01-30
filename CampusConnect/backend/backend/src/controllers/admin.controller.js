// src/controllers/admin.controller.js
import User from "../models/user.js"

export function test(req, res) {
  res.json({ ok: true, msg: 'admin API reachable', user: req.user });
};

export async function listUsers(req, res) {
  try {
    // minimal projection to avoid sending password
    const users = await User.find({}, { password: 0 }).limit(200).lean();
    res.json(users);
  } catch (err) {
    console.error('listUsers error', err);
    res.status(500).json({ message: 'Could not fetch users' });
  }
};
export async function approveUser(req, res) {
  try {
    const id = req.params.id;
    const updated = await User.findByIdAndUpdate(id, { $set: { status: 'approved' } }, { new: true, projection: { password: 0 } });
    if (!updated) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User approved', user: updated });
  } catch (err) {
    console.error('approveUser error', err);
    res.status(500).json({ message: 'Could not approve user' });
  }
};
