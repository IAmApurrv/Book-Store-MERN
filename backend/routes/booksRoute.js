import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Route for Save a new Book
router.post('/', async (request, response) => {
  try {
    if (!request.body.title || !request.body.author || !request.body.imageURL || !request.body.description || !request.body.publishYear || !request.body.cost) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, imageURL, description, cost, publishYear',
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      imageURL: request.body.imageURL,
      description: request.body.description,
      publishYear: request.body.publishYear,
      cost: request.body.cost
    };
    const book = await Book.create(newBook);
    return response.status(201).send(book);
  }
  catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Books from database
router.get('/', async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Book from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json(book);
  }
  catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a Book
router.put('/:id', async (request, response) => {
  try {
    if (!request.body.title || !request.body.author || !request.body.imageURL || !request.body.description || !request.body.publishYear || !request.body.cost) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, imageURL, description, cost, publishYear',
      });
    }
    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).json({ message: 'Book not found.' });
    }
    return response.status(200).send({ message: 'Book successfully updated.' });
  }
  catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a book
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: 'Book not found.' });
    }
    return response.status(200).send({ message: 'Book successfully deleted.' });
  }
  catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
