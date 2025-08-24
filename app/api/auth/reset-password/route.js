import { hashPassword } from '@/lib/auth';
import { generateOTP, sendOTP } from '@/lib/emailService';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await dbConnect();

    const { action, email, otp, newPassword } = await request.json();

    if (!action) {
      return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
    }

    // 🔹 Step 1: Request OTP
    if (action === 'request-otp') {
      if (!email) {
        return NextResponse.json(
          { message: 'Email is required' },
          { status: 400 }
        );
      }

      const user = await User.findOne({ email });

      if (!user) {
        // Don’t reveal user existence
        return NextResponse.json({
          message: 'If the email exists, an OTP has been sent',
        });
      }

      const generatedOTP = generateOTP();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

      user.resetToken = generatedOTP;
      user.resetTokenExpiry = otpExpiry;
      await user.save();

      const emailSent = await sendOTP(email, generatedOTP);
      if (!emailSent) {
        return NextResponse.json(
          { message: 'Failed to send OTP' },
          { status: 502 }
        );
      }

      return NextResponse.json({ message: 'OTP sent to your email' });
    }

    // 🔹 Step 2: Verify OTP
    if (action === 'verify-otp') {
      if (!email || !otp) {
        return NextResponse.json(
          { message: 'Email and OTP are required' },
          { status: 400 }
        );
      }

      const user = await User.findOne({
        email,
        resetToken: otp,
        resetTokenExpiry: { $gt: new Date() },
      });

      if (!user) {
        return NextResponse.json(
          { message: 'Invalid or expired OTP' },
          { status: 400 }
        );
      }

      return NextResponse.json({ message: 'OTP verified successfully' });
    }

    // 🔹 Step 3: Reset Password
    if (action === 'reset-password') {
      if (!email || !otp || !newPassword) {
        return NextResponse.json(
          { message: 'Email, OTP and newPassword are required' },
          { status: 400 }
        );
      }

      const user = await User.findOne({
        email,
        resetToken: otp,
        resetTokenExpiry: { $gt: new Date() },
      });

      if (!user) {
        return NextResponse.json(
          { message: 'Invalid or expired OTP' },
          { status: 400 }
        );
      }

      const hashed = await hashPassword(newPassword);
      user.password = hashed;
      user.resetToken = undefined;
      user.resetTokenExpiry = undefined;
      user.isFirstLogin = false;
      await user.save();

      // ✅ Return role so frontend can redirect
      return NextResponse.json({
        message: 'Password reset successful',
        role: user.role,
      });
    }

    return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Password reset route error:', error?.message || error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
