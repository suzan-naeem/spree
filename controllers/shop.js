const Product = require('../models/product');

//const User = require('../models/user');


exports.getProducts = (req, res, next) => {
    Product.find().then(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'Shop',
            path: '/products',



        });
    });
};


exports.getIndex = (req, res) => {
    Product.find().then(products => {

        res.render('shop/index', {
            prods: products,

            pageTitle: 'All Products',

            pageTitle: 'Spree - HomePage',

            path: '/',

        });
    });
};

exports.getCart = (req, res) => {

    req.myUser.populate('cart.items.productId')
        //because of populate does not return a promise:
        .execPopulate()
        .then(user => {

            const products = user.cart.items;

            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                cart: products,
                totalPrice: user.cart.totalPrice

            });
        });




}

exports.postCart = (req, res) => {
    const prodId = req.body.productId;
    Product.findById(prodId).then(product => {
            console.log(product);
            return req.myUser.addToCart(product);

            //console.log(document);

        })
        .then(result => {

            res.redirect('/cart');
        })
        .catch((err) => {
            console.log(err);
        })




};
exports.postCartDeleteProduct = (req, res) => {
    const prodId = req.body.productId;
    const prodPrice = req.body.productPrice;
    req.myUser
        .removeFromCart(prodId, prodPrice)
        .then(result => {

            res.redirect('/cart');
        })
        .catch(err => {
            console.log(err);
        });


};

exports.getWishList = (req, res) => {

    Product.fetchAll(products => {

        res.render('shop/wishlist', {
            path: '/wishlist',
            pageTitle: 'Wishlist',
            prods: products
        });
    });
};

exports.getCheckout = (req, res) => {
        res.render('shop/checkout', {
            path: '/checkout',
            pageTitle: 'Checkout'
        });
    }
    //console.log(products[0].title);
exports.getProductDetail = (req, res) => {
    console.log("My user:");
    console.log(req.myUser);
    const prodId = req.params.productId;
    // console.log(prodId);
    Product.findById(prodId).then(product => {
        // console.log(product);
        // console.log(prodId);
        res.render('shop/product-detail', {
            product: product,
            pageTitle: 'Product Detail',
            path: '/products',

        });
    });


}