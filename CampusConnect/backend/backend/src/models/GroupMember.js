import mongoose from 'mongoose';

const groupMemberSchema = new mongoose.Schema({
  group_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: { createdAt: 'joined_at', updatedAt: false }
});

// Compound index for unique group-user pairs
groupMemberSchema.index({ group_id: 1, user_id: 1 }, { unique: true });

// Middleware to update members_count on join
groupMemberSchema.post('save', async function(doc) {
  try {
    const Group = mongoose.model('Group');
    await Group.findByIdAndUpdate(doc.group_id, { $inc: { members_count: 1 } });
  } catch (err) {
    console.error('GroupMember post-save hook error:', err.message);
  }
});

// Middleware to update members_count on leave (works with findOneAndDelete)
groupMemberSchema.post('findOneAndDelete', async function(doc) {
  try {
    if (!doc) return;
    const Group = mongoose.model('Group');
    await Group.findByIdAndUpdate(doc.group_id, { $inc: { members_count: -1 } });
  } catch (err) {
    console.error('GroupMember post-delete hook error:', err.message);
  }
});

export default mongoose.model('GroupMember', groupMemberSchema);
