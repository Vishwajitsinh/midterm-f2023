// Authentication Routes

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

  res.render('books/details', {
    title: 'Add Book',
    book: new Book(),
  });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  const newBook = new Book({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    
  });

  
  newBook.save((err, book) => {
    if (err) {
      
      console.error(err);
      res.redirect('/books/add');
    } else {
      
      res.redirect('/books');
    }
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

  const id = req.params.id;

  // Find the book by its ID
  Book.findById(id, (err, book) => {
    if (err) {
      // Handle errors
      console.error(err);
      res.redirect('/books');
    } else {
      
      res.render('books/details', {
        title: 'Edit Book',
        book: book,
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  const id = req.params.id;

  // Find and update the book by its ID
  Book.findByIdAndUpdate(
    id,
    {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      // Update other properties as needed
    },
    (err, book) => {
      if (err) {
        // Handle errors
        console.error(err);
        res.redirect('/books');
      } else {
        // Redirect to the BooksList page after successful update
        res.redirect('/books');
      }
    }
  );

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  const id = req.params.id;

  // Remove the book by its ID
  Book.findByIdAndRemove(id, (err) => {
    if (err) {
      // Handle errors
      console.error(err);
    }
    // Redirect to the BooksList page after successful deletion
    res.redirect('/books');
  });
});


module.exports = router;})
