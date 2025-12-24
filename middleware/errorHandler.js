const { sendError } = require('../utils/response');

module.exports = (err, req, res, next) => {
  console.error(err);
  sendError(res, 'Server Error', 500);
};  