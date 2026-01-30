import mongoose from 'mongoose';

const eventRSVPSchema = new mongoose.Schema({
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: { createdAt: 'rsvp_at', updatedAt: false }
});

// Compound index for unique event-user pairs
eventRSVPSchema.index({ event_id: 1, user_id: 1 }, { unique: true });

export default mongoose.model('EventRSVP', eventRSVPSchema);
