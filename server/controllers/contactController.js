// @desc    Handle contact form submission
// @route   POST /api/contact
// @access  Public
const submitContact = (req, res) => {
    const { name, email, message } = req.body;

    // Validation (Backend always validates!)
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Please fill in all fields' });
    }

    // In a real app, you would use 'nodemailer' here to send an email to yourself
    console.log("------------------------------------------------");
    console.log("📩 NEW MESSAGE RECEIVED:");
    console.log(`From: ${name} (${email})`);
    console.log(`Message: ${message}`);
    console.log("------------------------------------------------");

    res.status(200).json({ success: true, message: 'Message received successfully!' });
};

module.exports = { submitContact };