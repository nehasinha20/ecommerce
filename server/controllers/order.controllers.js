const order = require('../models/order.model.js');

// Retrieve and return all orders from the database.
exports.findAll = (req, res) => {
    order.find()
    .populate('items')
    .exec()
    .then(orders => {
        res.send(orders);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while getting list of orders."
        });
    });
};

// Create and Save a new order
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Please fill all required field"
        });
    }

    // Create a new order
    const orders = new order({
        firstName: req.body.firstName, 
        lastName: req.body.lastName,
        email: req.body.email,
        addressOne: req.body.addressOne,
        addressTwo: req.body.addressTwo,
        country: req.body.country,
        state: req.body.state,
        zip: req.body.zip,
        items: req.body.items.map(item => item._id) || []
    });

    // Save order in the database
    orders.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while creating new order."
        });
    });
};

// Find a single order with a id
exports.findOne = (req, res) => {
    order.findById(req.params.id)
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "order not found with id " + req.params.id
            });            
        }
        res.send(order);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "order not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error getting order with id " + req.params.id
        });
    });
};

// Update a order identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Please fill all required field"
        });
    }
//console.log(req.body);
    // Find order and update it with the request body
    order.updateOne({_id:req.params.id}, {
        name: req.body.name, 
        description: req.body.description,
        image: req.body.image,
        price: req.body.price
    })
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "order not found with id " + req.params.id
            });
        }
        res.send(order);
    }).catch(err => {
        //console.log(err);
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "order not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating order with id " + req.params.id
        });
    });
};

// Delete a order with the specified id in the request
exports.delete = (req, res) => {
    order.findByIdAndRemove(req.params.id)
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "order not found with id " + req.params.id
            });
        }
        res.send({message: "order deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "order not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete order with id " + req.params.id
        });
    });
};