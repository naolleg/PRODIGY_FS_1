import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const userUtility = {
  generateDigitOTP() {
    return Math.floor(Math.random() * 900000 + 100000);
  },

  async sendEmail(userEmail, otp) {
    console.log('Preparing to send email to:', userEmail);
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: 'Password Reset',
        text: `Your password reset otp is|  ${otp}  |. If you did not request this, please ignore it. `,
      };

      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully to:', userEmail);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  },
};

export default userUtility;