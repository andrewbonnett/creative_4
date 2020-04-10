const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/moonstone', {
  useNewUrlParser: true
});

// Configure multer so that it will upload to '../front-en$
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/products/',
  limits: {
    fileSize: 10000000
  }
});

// Create a scheme for items in moonstone: a title and a path to an image.
const itemSchema = new mongoose.Schema({
  name: String,
  //gender: String,
  //category: [Array],
  price: Number,
  path: String, //image path
});

const cartItemSchema = new mongoose.Schema({
  name: String,
  path: String, //image path
  price: Number,
});

// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);
const CartItem = mongoose.model('CartItem', cartItemSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/products/" + req.file.filename
  });
});

// Create a new item
app.post('/api/items', async (req, res) => {
  const item = new Item({
    name: req.body.name,
    //gender: "",
    //category: ??syntax??
    price: req.body.price,
    path: req.body.path,
    description: req.body.description,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//Create a new item in the cart
app.post('/api/cartItems', async (req, res) => {
  const cartItem = new CartItem({
    name: req.body.name,
    price: req.body.price,
    path: req.body.path,
  });
  try {
    await cartItem.save();
    res.send(cartItem);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the items.
app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//Get a list of all cartItems
app.get('/api/cartItems', async (req, res) => {
  try {
    let items = await CartItem.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/items/:id', async (req, res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/cartItems/:name', async (req, res) => {
  try {
    await CartItem.deleteMany({
      name: req.params.name
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findOne({
      _id: req.params.id
    });
    item.name = req.body.name;
    //item.gender
    //item.category
    item.price = req.body.price;
    item.path = req.body.path;
    item.description = req.body.description;
    await item.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(3000, () => console.log('Server listening on port 3000!'));
