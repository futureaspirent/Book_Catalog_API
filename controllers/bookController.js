const Book = require('../models/Book');
const { sendSuccess, sendError } = require('../utils/response');

exports.createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    sendSuccess(res, book, 201);
  } catch (err) {
    sendError(res, 'Create failed', 400);
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    sendSuccess(res, books);
  } catch (err) {
    sendError(res, 'Server error', 500);
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return sendError(res, 'Not found', 404);
    sendSuccess(res, book);
  } catch (err) {
    sendError(res, 'Invalid ID', 400);
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    
    if (!book) return sendError(res, 'Not found', 404);
    sendSuccess(res, book);
  } catch (err) {
        console.error(err);
    sendError(res, err.message, 400);
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return sendError(res, 'Not found', 404);
    sendSuccess(res, { message: 'Deleted' });
  } catch (err) {
    sendError(res, 'Delete failed', 400);
  }
};