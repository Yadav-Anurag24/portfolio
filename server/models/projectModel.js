const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    id: { type: Number, required: true, unique: true }, // Keeping ID for compatibility with your frontend
    name: { type: String, required: true },
    description: { type: String, required: true },
    techStack: [{ type: String }], // Array of strings
    features: [{ type: String }],
    status: { type: String, required: true },
    githubLink: { type: String },
    liveLink: { type: String },
    featured: { type: Boolean, default: false }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('Project', projectSchema);