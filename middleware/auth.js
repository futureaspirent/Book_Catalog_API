const jwt = require('jsonwebtoken');
const { sendError } = require('../utils/response');

module.exports = (req, res, next) => {
  const header = req.header('Authorization');
  if (!header?.startsWith('Bearer ')) return sendError(res, 'No token', 401);

  const token = header.split(' ')[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    sendError(res, 'Invalid token', 401);
  }
};