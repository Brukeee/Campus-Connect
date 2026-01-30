import mongoose from 'mongoose';

const groupMessageSchema = new mongoose.Schema({
  group_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  file_path: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

export default mongoose.model('GroupMessage', groupMessageSchema);
