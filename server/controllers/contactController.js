const Contact = require('../models/contactModel');
const nodemailer = require('nodemailer');

// ─── Helpers ─────────────────────────────────────────────────

/** Strip HTML tags and trim whitespace to prevent XSS / injection */
const sanitizeString = (str) => {
    if (typeof str !== 'string') return '';
    return str
        .replace(/<[^>]*>/g, '')   // strip HTML tags
        .replace(/[<>]/g, '')      // remove stray angle brackets
        .trim();
};

/** Basic email format check */
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// @desc    Handle contact form submission
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
    console.log("-----------------------------------");
    console.log("📨 Incoming Contact Request");

    // Sanitize all inputs
    const name    = sanitizeString(req.body.name);
    const email   = sanitizeString(req.body.email);
    const subject = sanitizeString(req.body.subject);
    const message = sanitizeString(req.body.message);

    // 1. Validation
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Please fill in all fields' });
    }

    if (name.length > 100 || email.length > 254 || subject.length > 200 || message.length > 5000) {
        return res.status(400).json({ success: false, message: 'Input exceeds maximum allowed length.' });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    try {
        // 2. Save to MongoDB (Backup Log)
        const newContact = await Contact.create({
            name,
            email,
            subject: subject || 'No Subject',
            message
        });
        console.log(`✅ Saved to Database with ID: ${newContact._id}`);

        // 3. Send Email Notification (The "Professional" Part)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender (Your generic portfolio email)
            to: process.env.EMAIL_USER,   // Receiver (You!)
            replyTo: email,               // When you hit "Reply", it goes to the User
            subject: `🚀 Portfolio Contact: ${subject || 'New Message'}`,
            text: `
                You have a new message from your Portfolio!
                
                From: ${name}
                Email: ${email}
                Subject: ${subject}
                
                Message:
                ${message}
            `
        };

        await transporter.sendMail(mailOptions);
        console.log("📧 Email Notification Sent Successfully!");

        res.status(201).json({ 
            success: true, 
            message: 'Message sent! I will get back to you soon.' 
        });

    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({ success: false, message: 'Server Error. Failed to send message.' });
    }
};

module.exports = { submitContact };