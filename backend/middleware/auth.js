import jwt from 'jsonwebtoken';

export default function auth(req, res, next) {
  let token = null;

  // 1. Check Authorization header first (for Bearer token login like email/password or OTP)
  const header = req.headers.authorization || '';
  if (header) {
    const parts = header.split(' ');
    if (parts.length === 2 && /^Bearer$/i.test(parts[0])) {
      const val = parts[1].trim();
      if (val && val !== 'cookie' && val !== 'null' && val !== 'undefined') {
        token = val;
      }
    }
  }

  // 2. If no valid Bearer token in header, check cookies (for cookie-based sessions / Google OAuth)
  if (!token) {
    token = (req.cookies && (req.cookies.jwt || req.cookies.token)) || null;
  }

  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const secret = process.env.JWT_SECRET || 'dev_secret_change_me';
    const payload = jwt.verify(token, secret);
    req.userId = payload.id || payload._id || payload.userId;
    if (!req.userId) return res.status(401).json({ message: 'Invalid token' });
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
