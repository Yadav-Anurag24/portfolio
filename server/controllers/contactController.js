const Contact = require('../models/contactModel');

// @desc    Handle contact form submission
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
    console.log("-----------------------------------");
    console.log("📨 Incoming Contact Request:", req.body); // Tracker Log

    try {
        const { name, email, subject, message } = req.body;

        // 1. Validation
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: 'Please fill in all fields' });
        }

        // 2. Save to MongoDB
        const newContact = await Contact.create({
            name,
            email,
            subject: subject || 'No Subject', // Default if subject is missing
            message
        });

        console.log(`✅ Saved to Database with ID: ${newContact._id}`);
        console.log("-----------------------------------");

        res.status(201).json({ 
            success: true, 
            message: 'Message saved successfully!' 
        });

    } catch (error) {
        console.error('❌ Database Error:', error);
        res.status(500).json({ success: false, message: 'Server Error. Failed to save message.' });
    }
};

module.exports = { submitContact };