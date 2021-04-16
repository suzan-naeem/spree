const Product = require('./product');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: Number,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    cart: {
        items: [{
            productId: { type: Schema.Types.ObjectId, ref: 'Product', require: true },
            quantity: { type: Number, required: true }
        }],
        totalPrice: { type: Number }
    }
});


userSchema.methods.addToCart = function(product) {


    //First we check if we have this product before we want to increase quantity
    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;

    //const existingProduct = cart.products[existingProductIndex];
    const updatedCartItems = [...this.cart.items];

    //if it is existing  before in the cart:
    if (cartProductIndex >= 0) {
        //here we want to increase quantity
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        //apply changes
        updatedCartItems[cartProductIndex].quantity = newQuantity;

    } else {
        //that means we have a new product 
        updatedCartItems.push({
            productId: product._id,
            //in that case quantity =1
            quantity: newQuantity
        });
    }
    //add all changes to a updatedCart object 
    const updatedCart = {
        items: updatedCartItems,
        totalPrice: this.cart.totalPrice + product.price

    }

    // apply changes to our cart: this.cart
    this.cart = updatedCart;
    return this.save();


}



userSchema.methods.removeFromCart = function(productId, productPrice) {

    //find our product Index
    const removedProductIndex = this.cart.items.findIndex(item => {

        return item.productId.toString() === productId.toString();

    });

    //Filter product we want to delete
    const updatedCartItems = this.cart.items.filter(item => {

        return item.productId.toString() !== productId.toString();

    });


    const amountDecPrice = this.cart.items[removedProductIndex].quantity * productPrice;
    //apply changes 
    this.cart.items = updatedCartItems;
    this.cart.totalPrice = this.cart.totalPrice - amountDecPrice;
    //save changes
    return this.save();
};


module.exports = mongoose.model('Users', userSchema);