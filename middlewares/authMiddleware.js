const jwt = require('jsonwebtoken');
require('dotenv').config();
const authMiddleWare = (req, res, next) => {
    const secretKey = process.env.SECRET_KEY;
    const token = req.header('Authorization') || '';
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }
    const decode = jwt.decode(token, secretKey);
    if (!decode) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }
    req.user = decode;
    next();
  }
  module.exports = authMiddleWare