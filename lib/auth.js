import { compare as bcryptCompare, hash as bcryptHash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const { JWT_SECRET } = process.env;
if (!JWT_SECRET) {
  throw new Error('Missing JWT_SECRET environment variable');
}

// Hash password
export async function hashPassword(password) {
  return bcryptHash(password, 12);
}

// Verify password
export async function verifyPassword(password, hashedPassword) {
  return bcryptCompare(password, hashedPassword);
}

// Generate JWT
export function generateToken(userId, role) {
  return jwt.sign({ userId, role }, JWT_SECRET, {
    expiresIn: '24h',
    algorithm: 'HS256',
  });
}

// Verify JWT
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] });
  } catch {
    return null;
  }
}

// Get session from cookies (async)
export async function getSession() {
  const cookieStore = await cookies(); // ✅ await
  const token = cookieStore.get('token')?.value;
  if (!token) return null;
  return verifyToken(token);
}
