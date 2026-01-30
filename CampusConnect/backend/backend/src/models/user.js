// src/models/User.js
// const mongoose = require('mongoose');
// const userSchema = new mongoose.Schema({
//   full_name: { type: String, required: true },
//   email: { type: String, required: true, unique: true, match: /^.+@.+\..+$/ },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['student', 'university_admin', 'super_admin'], required: true },
//   // ... add all other fields from your schema
//   created_at: { type: Date, default: Date.now }
// });
// module.exports = mongoose.model('User', userSchema);
// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    university_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'University'
    },
    student_id: {
        type: String,
        sparse: true // Allows null for non-students
    },
    batch: {
        type: Number, // Year as number
        min: 1900,
        max: new Date().getFullYear() + 10
    },
    profile_picture: {
        type: String,
        default: '/assets/user_profile.jpg'
    },
    cover_photo: {
        type: String,
        default: '/assets/default_cover.jpg'
    },
    bio: {
        type: String,
        default: ''
    },
    interests: [{
        type: String,
        trim: true
    }],
    linkedin: {
        type: String,
        default: ''
    },
    twitter: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        enum: ['student', 'admin'],
        default: 'student'
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    id_picture: {
        type: String,
        default: '/assets/default_id.jpg'
    },
    approved_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

// Add validation for student role
// userSchema.pre('save', function(next) {
//     if (this.role === 'student') {
//         if (!this.university_id || !this.student_id || !this.batch) {
//             const error = new Error('Students must have university_id, student_id, and batch.');
//             return next(error);
//         }
//     }
//     next();
// });

userSchema.pre('findOneAndUpdate', function(next) {
    const update = this.getUpdate();
    
    if (update.role === 'student' || update.$set?.role === 'student') {
        const data = update.$set || update;
        if (!data.university_id || !data.student_id || !data.batch) {
            const error = new Error('Students must have university_id, student_id, and batch.');
            return next(error);
        }
    }
    next();
});

export default mongoose.model('User', userSchema);