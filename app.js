const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const User = require('./models/user');
const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const loginRoutes = require('./routes/login');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('eitharyahia@yahoo.com')
        .then(user => {
            console.log(user);
            req.myUser = user;
            console.log(req);
            next();
        })
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(loginRoutes);



app.use(errorController.get404);

mongoose.connect('mongodb+srv://eithar:123@cluster0.jg0og.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(result => {
        app.listen(4000);
        // console.log(result);

    })
    .catch(err => {
        console.log(err);
    });