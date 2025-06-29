require('dotenv').config();
const nodemailer = require('nodemailer');
const { reachOutMail } = require('../template/reachOutMail');

const sendEmail = async(subject, text, emailAddress, mobileNumber, fullName) => {
    try {
        console.log("req_sendEmail", subject, text, emailAddress, mobileNumber, fullName);
        // const subject = req?.body?.emailSubject;
        // const text = req?.body?.message;
        // const emailAddress = req?.body?.emailAddress;
        // const mobileNumber = req?.body?.mobileNumber
        // const fullName = req?.body?.fullName

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: emailAddress, // Change this to the sender's email address
            to: process.env.EMAIL_USER, // Change this to the recipient's email address
            subject: subject,
            text: text,
            html: reachOutMail(fullName, mobileNumber) // Optional: HTML version of the email
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        
        return true
    } catch (error) {
        console.error('Error sending email:', error);
        // res.status(500).jslson({ error: 'Failed to send email' });
    }
}

module.exports = {
    sendEmail
}
