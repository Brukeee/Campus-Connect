// models/Event.js
import mongoose from "mongoose"

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String, // Store as string like "09:00:00" or use Date
    },
    category: {
        type: String,
        enum: ['academic', 'social', 'sports', 'cultural', 'professional'],
        default: 'social'
    },
    location: {
        type: String,
        default: ''
    },
    attendance: {
        type: String,
        enum: ['in-person', 'virtual'],
        default: 'in-person'
    },
    organizer: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: '/assets/default_event.jpg'
    },
    creator_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Event', eventSchema);