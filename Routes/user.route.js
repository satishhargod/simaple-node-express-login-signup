const express = require('express');
const router = express.Router();

const UserController = require('../Controllers/user.controller');

//Get a list of all products
//router.get('/', UserController.getAllProducts);

//Create a new product
router.post('/register', UserController.createUser);
router.post('/login', UserController.login);

//Get a product by id
//router.get('/:id', UserController.findProductById);

//Update a product by id
//router.patch('/:id', UserController.updateAProduct);

//Delete a product by id
//router.delete('/:id', UserController.deleteAProduct);

module.exports = router;
