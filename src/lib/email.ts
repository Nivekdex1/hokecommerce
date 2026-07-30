import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "mail.privateemail.com",
  port: parseInt(process.env.EMAIL_PORT || "465"),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // e.g. shop@homeofkoreanbeauty.com
    pass: process.env.EMAIL_PASS, // email password
  },
});

export const sendEmail = async ({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}) => {
  const mailOptions = {
    from: `"HOK Beauty" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
};
