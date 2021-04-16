const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);





/*const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

//to generate a unique id to each product
const { v4: uuidv4 } = require('uuid');


const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
};


module.exports = class Product {
    constructor(id, title, image, price, desc, info) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.price = price;
        this.desc = desc;
        this.info = info;
    }

    save() {

        ///console.log(this.id);
        getProductsFromFile(products => {
            //check if we have that id tha means we want to edit
            if (this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                console.log("this");
                console.log(this);
                fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                    console.log(err);
                });
            } else {
                //add new property: id
                this.id = uuidv4();

                products.push(this);

                fs.writeFile(p, JSON.stringify(products), err => {
                    console.log(err);
                });
            }


        });
    };

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
    
    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });

    }


    static deleteById(id) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            const updatedProducts = products.filter(p => p.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                console.log(err);
                if (!err) {
                    //remove that product from cart
                    Cart.deleteProduct(id, product.price);
                }
            });
        });

    }
};
*/