import { compare as bcryptCompare, hash as bcryptHash } from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;
if (!JWT_SECRET) {
  throw new Error('Missing JWT_SECRET environment variable');
}

export async function hashPassword(password) {
  return bcryptHash(password, 12);
}

export async function verifyPassword(password, hashedPassword) {
  return bcryptCompare(password, hashedPassword);
}

export function generateToken(userId, role) {
  return jwt.sign({ userId, role }, JWT_SECRET, {
    expiresIn: '24h',
    algorithm: 'HS256',
  });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] });
  } catch {
    return null;
  }
}

// Helper you can use in route handlers: pass a function that returns a cookie by name
export function getSessionFromRequestCookie(getCookie) {
  const token = getCookie('token');
  if (!token) return null;
  return verifyToken(token);
}
