import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

const userUtility = {
  generateDigitOTP() {
    return Math.floor(Math.random() * 900000 + 100000);
  },
  async sendEmail(userEmail, OTP) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD, // or process.env.EMAIL_APP_PASSWORD
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: "Verification Code",
        text: `Your verification code is ${OTP}`,
      };

      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully!", OTP);
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  },
};

export default userUtility;