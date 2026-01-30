// models/Message.js
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver_id: {
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
    },
    seen: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: { createdAt: 'timestamp', updatedAt: false }
});

// Index for faster querying
messageSchema.index({ sender_id: 1, receiver_id: 1 });

export default mongoose.model('Message', messageSchema);