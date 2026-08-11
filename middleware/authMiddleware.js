const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization token tidak ditemukan." });
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;
    if (!token) {
      return res.status(401).json({ message: "Format token tidak valid." });
    }

    const secret = process.env.JWT_SECRET || 'mySuperSecretKey123';
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token tidak valid atau telah kedaluwarsa." });
  }
};

module.exports = authMiddleware;
