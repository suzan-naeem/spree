const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    //  Product.fetchAll(products => {
    res.render('admin/edit-product', {
        // prods: products,
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false

    });
    //});
};


exports.postAddProduct = (req, res, next) => {

    const product = new Product({
        title: req.body.title,
        image: req.body.image,
        price: req.body.price,
        desc: req.body.desc,
        info: req.body.info
    });
    product.save();
    res.redirect('/admin/products');
};


exports.getEditProduct = (req, res, next) => {
    //?edit=true, query params
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId).then(product => {

        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });

    });


};


exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId).then(product => {
        product.title = req.body.title;
        product.image = req.body.image;
        product.price = req.body.price;
        product.desc = req.body.desc;
        product.info = req.body.info;

        product.save();
        res.redirect('/admin/products');
    });

};



exports.getAllProducts = (req, res) => {

    Product.find().then(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products',

        });
    });
};


exports.postDeleteProduct = (req, res) => {
    const prodId = req.body.productId;
    console.log(prodId);
    Product.findByIdAndRemove(prodId).then(() => {
        res.redirect('/admin/products');

    });
};