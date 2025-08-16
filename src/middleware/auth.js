const jwt = require('jsonwebtoken');

exports.adminAuth = (req, res, next) => {
  const header = req.headers.authorization;
  console.log(header)
  if (!header) return res.status(401).json({ message: 'No token' });
  const token = header;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};