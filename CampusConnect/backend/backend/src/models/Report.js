import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  reporter_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reported_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  type: {
    type: String,
    enum: ['user', 'group', 'event', 'post', 'message'],
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'resolved'],
    default: 'pending'
  }
}, {
  timestamps: { createdAt: 'timestamp', updatedAt: false }
});

// Compound index for filtering
reportSchema.index({ type: 1, status: 1 });

export default mongoose.model('Report', reportSchema);
