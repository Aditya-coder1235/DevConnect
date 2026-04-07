const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    avatar: {
        type: String,
        default: ""
    },

    bio: {
        type: String,
        default: ""
    },

    skills: [{
        type: String
    }],

    github: {
        type: String,
        default: ""
    },

    portfolio: {
        type: String,
        default: ""
    },

    experienceLevel: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        default: "Beginner"
    },

    role: {
        type: String,
        enum: ["developer", "founder"],
        default: "developer"
    },

    profileCompleted: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: {
        type: String
    },

    resetPasswordExpires: {
        type: Date
    }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);