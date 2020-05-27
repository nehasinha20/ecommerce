const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const config = require('./config');


const Order = require('./models/order.model');
const Product = require('./models/product.model');
// Connecting to the database
mongoose.connect(config.mongoUrl, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database.', err);
    process.exit();
});

mongoose.Promise = global.Promise

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../dist')))

const productRoutes = require('./routes/product.routes')
app.use('/api/products', productRoutes)

const orderRoutes = require('./routes/order.routes')
app.use('/api/orders', orderRoutes)

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname,'../dist/index.html'))
});
app.listen(3000, () => console.log("Listening on port 3000..."));