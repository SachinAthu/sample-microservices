const express = require('express');
const router = express.Router();
const Controller = require('../Controllers/Cart');

router
    .route('/')
    .post(Controller.createCart);

router
    .route('/:customerId')
    .get(Controller.getCart);

module.exports = router;



