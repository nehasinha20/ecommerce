const express = require('express')
const router = express.Router()
const productController = require('../controllers/product.controllers');

// Retrieve all users
router.get('/', productController.findAll);

// Create a new user
router.post('/', productController.create);

// Retrieve a single user with id
router.get('/:id', productController.findOne);

// Update a user with id
router.put('/:id', productController.update);

// Delete a user with id
router.delete('/:id', productController.delete);


module.exports = router