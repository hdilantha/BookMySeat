const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    type: {
        type: String
    },
    telephone: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required:true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUserName = function(username, callback) {
    const query = {name: username}
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function(candidatepassword, hash, callback) {
    bcrypt.compare(candidatepassword, hash, function(err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
    });
}
