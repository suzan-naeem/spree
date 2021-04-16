const User = require('../models/user');

exports.getLoginPage = (req, res) => {
    res.render('login', {
        path: '/login',
        pageTitle: 'Login'

    });
}

exports.postLogin = (req, res) => {
    console.log(req.body);
    User.findById(req.body.email).then(user => {
        if (!user) {
            res.redirect('/signup');
        } else {
            req.user = user;
            res.setHeader('set-cookie', 'User =user');
            res.redirect('/products');
        }
    });

}


exports.postSignUp = (req, res) => {
    console.log(req.body);
    const user = new User({
        _id: req.body.email,
        name: req.body.username,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        cart: {
            items: [],
            totalPrice: 0
        }
    });
    //req.user = user;
    user.save();
    res.redirect('/products');
};

exports.getSignUp = (req, res) => {
    res.render('signup', {
        path: '/signup',
        pageTitle: 'Sign Up'

    });
}

exports.getProfile = (req, res) => {
    res.render('profile', {
        path: '/profile',

        pageTitle: 'Profile',
        user: req.myUser


    });
}