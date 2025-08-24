import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function hashPassword(password) {
  return await bcryptjs.hash(password, 12);
}

export async function verifyPassword(password, hashedPassword) {
  return await bcryptjs.compare(password, hashedPassword);
}

export function generateToken(userId, role) {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export function getSession(req) {
  const token = req.cookies.get('token')?.value;
  if (!token) return null;
  return verifyToken(token);
}
