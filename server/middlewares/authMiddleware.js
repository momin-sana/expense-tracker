// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(403).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1]; // Extract token after 'Bearer'
  if (!token) return res.status(403).json({ error: 'Malformed token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // ✅ this ID will be used in expenses to get user's data
    next(); // ➡️ pass to controller
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};
