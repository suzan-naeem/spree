const path = require('path');

const express = require('express');

const loginController = require('../controllers/login');

const router = express.Router();
router.post('/login', loginController.postLogin);

router.get('/login', loginController.getLoginPage);

router.get('/signup', loginController.getSignUp);

router.post('/signup', loginController.postSignUp);


router.get('/profile', loginController.getProfile);

module.exports = router;