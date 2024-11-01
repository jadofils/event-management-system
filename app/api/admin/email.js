// pages/api/sendEmail.js
import sgMail from '@sendgrid/mail';

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const TO_EMAIL = process.env.TO_EMAIL ?? 'default@gmail.com';
const FROM_EMAIL = process.env.FROM_EMAIL ?? 'default@gmail.com';

export default async (req, res) => {
    // Check for POST request
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, message } = req.body;

    // Validate input
    if (!email || !message) {
        return res.status(400).json({ message: 'Email and message are required' });
    }

    const msg = {
        to: TO_EMAIL,
        from: FROM_EMAIL,
        subject: 'Mail from ' + email,
        text: message,
        html: message,
    };

    try {
        await sgMail.send(msg);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error sending email', error: error.message });
    }
};
