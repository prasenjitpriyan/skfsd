import { hashPassword } from '@/lib/auth';
import { generateOTP, sendOTP } from '@/lib/emailService';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await dbConnect();
    const { action, email, otp, newPassword } = await request.json();

    if (action === 'request-otp') {
      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json(
          { message: 'User not found' },
          { status: 404 }
        );
      }

      const generatedOTP = generateOTP();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      user.resetToken = generatedOTP;
      user.resetTokenExpiry = otpExpiry;
      await user.save();

      const emailSent = await sendOTP(email, generatedOTP);
      if (!emailSent) {
        return NextResponse.json(
          { message: 'Failed to send OTP' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        message: 'OTP sent to your email',
      });
    }

    if (action === 'verify-otp') {
      const user = await User.findOne({
        email,
        resetToken: otp,
        resetTokenExpiry: { $gt: Date.now() },
      });

      if (!user) {
        return NextResponse.json(
          { message: 'Invalid or expired OTP' },
          { status: 400 }
        );
      }

      return NextResponse.json({
        message: 'OTP verified successfully',
      });
    }

    if (action === 'reset-password') {
      const user = await User.findOne({
        email,
        resetToken: otp,
        resetTokenExpiry: { $gt: Date.now() },
      });

      if (!user) {
        return NextResponse.json(
          { message: 'Invalid or expired OTP' },
          { status: 400 }
        );
      }

      const hashedPassword = await hashPassword(newPassword);
      user.password = hashedPassword;
      user.resetToken = undefined;
      user.resetTokenExpiry = undefined;
      user.isFirstLogin = false;
      await user.save();

      return NextResponse.json({
        message: 'Password reset successful',
      });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
