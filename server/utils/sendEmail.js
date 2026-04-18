const nodemailer = require('nodemailer');
require('dotenv').config();

const sendConfirmationEmail = async (userEmail, userName, serviceName, date, timeSlot) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Appointment Confirmed',
      text: `Hello ${userName},\n\nYour appointment has been successfully booked.\n\nDetails:\nService: ${serviceName}\nDate: ${date}\nTime: ${timeSlot}\n\nThank you!`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

module.exports = { sendConfirmationEmail };
