const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        default: ""
    },

    techStack: {
        type: [String],
        default: []
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    teamSize: {
        type: Number,
        default: 1
    },

    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    status: {
        type: String,
        enum: ["open", "in-progress", "completed"],
        default: "open"
    }

}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;