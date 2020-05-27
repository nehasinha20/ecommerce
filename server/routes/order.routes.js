const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order.controllers');

// Retrieve all order
router.get('/', orderController.findAll);

// Create a new order
router.post('/', orderController.create);

// Retrieve a single user with id
router.get('/:id', orderController.findOne);

// Update a order with id
router.put('/:id', orderController.update);

// Delete a order with id
router.delete('/:id', orderController.delete);


module.exports = router