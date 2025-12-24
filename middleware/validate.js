const { body, validationResult } = require('express-validator');
const { sendError } = require('../utils/response');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array()[0];
    const field = firstError.path; 
    const message = firstError.msg;
    return sendError(res, `${message} (${field})`, 400);
  }
  next();
};

exports.validateRegister = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .trim(),
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  handleValidation
];

exports.validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidation
];

exports.validateBook = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .trim(),
  body('author')
    .notEmpty()
    .withMessage('Author is required')
    .trim(),
  body('genre')
    .notEmpty()
    .withMessage('Genre is required')
    .trim(),
  body('price')
    .isNumeric()
    .withMessage('Price must be a valid number')
    .toFloat(),
  body('inStock')
    .optional()
    .isBoolean()
    .withMessage('inStock must be true or false')
    .toBoolean(),
  handleValidation
];


exports.validateBookUpdate = [
  body('title')
    .optional()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .trim(),
  body('author')
    .optional()
    .notEmpty()
    .withMessage('Author cannot be empty')
    .trim(),
  body('genre')
    .optional()
    .notEmpty()
    .withMessage('Genre cannot be empty')
    .trim(),
  body('price')
    .optional()
    .isNumeric()
    .withMessage('Price must be a valid number')
    .toFloat(),
  body('inStock')
    .optional()
    .isBoolean()
    .withMessage('inStock must be true or false')
    .toBoolean(),
  handleValidation
];