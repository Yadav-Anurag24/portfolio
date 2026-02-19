const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name: { type: String, required: true, maxlength: 100, trim: true },
    email: { type: String, required: true, maxlength: 254, trim: true },
    subject: { type: String, required: true, maxlength: 200, trim: true },
    message: { type: String, required: true, maxlength: 5000, trim: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema);