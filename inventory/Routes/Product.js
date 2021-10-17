const express = require('express');
const router = express.Router();
const Controller = require('../Controllers/Product');

router
    .route('/')
    .post(Controller.createProduct);

router
    .route('/:id')
    .get(Controller.getProduct);

router
    .route('/')
    .get(Controller.getProducts);


    

module.exports = router;



