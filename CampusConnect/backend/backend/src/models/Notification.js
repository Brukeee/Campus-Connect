import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['like', 'comment', 'connection_request', 'event_rsvp', 'group_join', 'message', 'signup_status'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  seen: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: { createdAt: 'timestamp', updatedAt: false }
});

// Index for faster querying by user
notificationSchema.index({ user_id: 1 });

export default mongoose.model('Notification', notificationSchema);
