const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
    const chkemail = req.body.email;
    let newUser = new User({
        name: req.body.name,
        password: req.body.password,
        type: req.body.type,
        telephone: req.body.telephone,
        email: req.body.email
    });
    User.getUserByEmail(chkemail, (err, user) => {
        if(err) throw err;
        if(user) {
            res.json({success: false, msg: 'Email already exists'});
        } else {
            User.addUser(newUser, (err, user) => {
                if(err) {
                    res.json({success: false, msg:'Failed to register user'});
                } else {
                    res.json({success: true, msg:'User registered'});
                }
            });
        }
    });
});

// Edit
router.post('/edit', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        telephone: req.body.telephone,
        email: req.body.email
    });
    User.editUser(newUser, (err, user) => {
        if(err) {
            res.json({success: false, msg:'Failed to save new details'});
        } else {
            res.json({success: true, msg:'User edited successfully'});
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.getUserByEmail(email, function(err, user) {
        if(err) throw err;
        if(!user) {
            return res.json({success: false, msg: 'User not found'});
        }

        User.comparePassword(password, user.password, function(err, isMatch) {
            if(err) throw err;
            if(isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        type: user.type,
                        telephone: user.telephone,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
});

router.get('/allusers', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    User.getAllUsers((err,resp)  => {
      res.json({users: resp});
    });
});


module.exports = router;
