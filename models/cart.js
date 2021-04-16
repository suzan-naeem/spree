const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);
// const pr = path.join(
//     path.dirname(process.mainModule.filename),
//     'data',
//     'products.json'
// );

module.exports = class Cart {

    static addProduct(id, productPrice) {

        //Fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
            }

            //First we check if we have this product before we want to increase quantity
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if (existingProduct) {
                //here we want to increase quantity
                updatedProduct = {...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                //replace the old product with a new in cart object=> cart.products[]
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                // fs.readFile(pr, (err, fileContent) => {
                //     let pd=JSON.parse(fileContent);
                //     updatedProduct=pd.find(p=>id==p.id);
                // });
                //that means we have a new product 
                updatedProduct = { id: id, qty: 1 };
                //add the new product(updated product ) to a cart object =>cart.products[]
                cart.products = [...cart.products, updatedProduct];

            }

            //we want to update cart price:
            cart.totalPrice = cart.totalPrice + +productPrice; //adding + to convert productPrice to int

            //save in a file:
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });

    }
    static deleteProduct(id, productPrice) {
        //1.read a cart file
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }
            //updated cart:
            //put previous cart in updated cart
            const fc = JSON.parse(fileContent);
            const updatedCart = {...fc };
            //find product in cart to count quantity and delete it

            const product = updatedCart.products.find(p => p.id === id);

            //if we don't find this product in cart
            if (!product) {
                return;
            }
            //quantity of product
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(p => p.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;

            //save this cart into cart file:
            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err);
            });
        });

    }
    static getCartProducts(cb) {
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if (err) {
                cb(null);
            } else {
                cb(cart);
            }
        });
    }
};