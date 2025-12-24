const express = require('express');
const auth = require('../middleware/auth');
const { validateBook, validateBookUpdate } = require('../middleware/validate'); // ← Import both
const { 
  createBook, 
  getAllBooks, 
  getBookById, 
  updateBook, 
  deleteBook 
} = require('../controllers/bookController');

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);

router.post('/', auth, validateBook, createBook);                    // Strict: all fields required
router.put('/:id', auth, validateBookUpdate, updateBook);           // Flexible: partial updates allowed
router.delete('/:id', auth, deleteBook);

module.exports = router;