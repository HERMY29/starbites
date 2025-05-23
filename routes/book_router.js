const express = require('express');
const {
    createBook,
    getBookById,
    getBooks,
    getBookByName,
    deleteBook,
    updateBook
} = require('../controller/books_controller');

const router = express.Router();

router.post('/createBook', createBook);
router.get('/getBook/:id_libro', getBookById);
router.get('/getBooks', getBooks);
router.get('/getBookByName', getBookByName);
router.put('/updateBook/:id_libro', updateBook);
router.delete('/deleteBook/:id_libro', deleteBook);


module.exports = router;
