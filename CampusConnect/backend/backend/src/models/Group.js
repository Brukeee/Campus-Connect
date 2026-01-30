// models/Group.js
import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        enum: ['study', 'sports', 'hobbies', 'clubs', 'professional'],
        default: 'clubs'
    },
    privacy: {
        type: String,
        enum: ['public', 'private'],
        default: 'public'
    },
    image: {
        type: String,
        default: '/assets/default_group.jpg'
    },
    creator_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members_count: {
        type: Number,
        default: 0,
        min: 0
    }
}, {
    timestamps: true
});

// Virtual for members (to be populated)
// groupSchema.virtual('members', {
//     ref: 'GroupMember',
//     localField: '_id',
//     foreignField: 'group_id'
// });

export default mongoose.model('Group', groupSchema);
