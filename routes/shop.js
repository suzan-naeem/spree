const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);


router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.get('/checkout', shopController.getCheckout);

///:productId that means it's a dynamic route
router.get('/products/:productId', shopController.getProductDetail);


router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.get('/wishlist', shopController.getWishList);
module.exports = router;