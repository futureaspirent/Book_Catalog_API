const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { sendSuccess, sendError } = require('../utils/response');

const genToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (await User.findOne({ email })) return sendError(res, 'User exists', 400);
    const user = await User.create({ name, email, password });
    sendSuccess(res, { token: genToken(user._id), user: { id: user._id, name, email } }, 201);
  } catch (err) {
    sendError(res, 'Server error', 500);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) return sendError(res, 'Invalid credentials', 401);
    sendSuccess(res, { token: genToken(user._id), user: { id: user._id, name: user.name, email } });
  } catch (err) {
    sendError(res, 'Server error', 500);
  }
};