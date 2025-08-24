import crypto from 'crypto';
import nodemailer from 'nodemailer';

const { EMAIL_USER, EMAIL_PASS } = process.env;
if (!EMAIL_USER || !EMAIL_PASS) {
  throw new Error('Missing EMAIL_USER or EMAIL_PASS environment variables');
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

transporter.verify().catch((err) => {
  console.error(
    'Nodemailer transporter verification failed:',
    err?.message || err
  );
});

export async function sendOTP(email, otp) {
  const mailOptions = {
    from: `"SKFSD" <${EMAIL_USER}>`,
    to: email,
    subject: 'SKFSD - Password Reset OTP',
    html: `
      <h2>Password Reset OTP</h2>
      <p>Your OTP for password reset is: <strong>${otp}</strong></p>
      <p>This OTP will expire in 10 minutes.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error(
      'Email sending error:',
      error?.response || error?.message || error
    );
    return false;
  }
}

export function generateOTP() {
  return crypto.randomInt(0, 1_000_000).toString().padStart(6, '0');
}
