const product = require('../models/product.model.js');

// Retrieve and return all products from the database.
exports.findAll = (req, res) => {
    product.find()
    .then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while getting list of products."
        });
    });
};

// Create and Save a new product
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Please fill all required field"
        });
    }

    // Create a new product
    const product = new product({
        name: req.body.name, 
        description: req.body.description,
        image: req.body.image,
        price: req.body.price
    });

    // Save product in the database
    product.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while creating new product."
        });
    });
};

// Find a single product with a id
exports.findOne = (req, res) => {
    product.findById(req.params.id)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "product not found with id " + req.params.id
            });            
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "product not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error getting product with id " + req.params.id
        });
    });
};

// Update a product identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Please fill all required field"
        });
    }
//console.log(req.body);
    // Find product and update it with the request body
    product.updateOne({_id:req.params.id}, {
        name: req.body.name, 
        description: req.body.description,
        image: req.body.image,
        price: req.body.price
    })
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "product not found with id " + req.params.id
            });
        }
        res.send(product);
    }).catch(err => {
        //console.log(err);
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "product not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating product with id " + req.params.id
        });
    });
};

// Delete a product with the specified id in the request
exports.delete = (req, res) => {
    product.findByIdAndRemove(req.params.id)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "product not found with id " + req.params.id
            });
        }
        res.send({message: "product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "product not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete product with id " + req.params.id
        });
    });
};