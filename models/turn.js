const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const TurnSchema = mongoose.Schema({
    turn_id: {
        type: String,
        required:true
    },
    license: {
        type: String,
        required:true
    },
    cities: {
        type: Array,
        required: true
    },
    return: {
        type: Boolean,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    seats: {
        type: Array,
        required:true
    },
    time: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required:true
    },
    status: {
        type: String,
        required:true
    }
});

const Turn = module.exports = mongoose.model('Turn', TurnSchema);

module.exports.getTurnById = function(id, callback) {
    Turn.findById(id, callback);
}

module.exports.getTurnByTurnId = function(turn_id, callback) {
    const query = {turn_id: turn_id, status: 'active'}
    Turn.findOne(query, callback);
}

module.exports.getTurnByRotue = function(city1, city2, date, callback) {
    const query = {cities: {$all: [city1, city2]}, date: date}
    Turn.find(query, callback);
}

module.exports.addTurn = function(newTurn, callback) {
    if (newTurn.return) {
      newTurn.cities = newTurn.cities.reverse();
    }
    newTurn.save(callback);
}

module.exports.getAllTurns = function(email, callback) {
    Turn.find({email: email, status: {$ne: 'expired'}}, callback);
}

module.exports.setSeats = function(turn_id, newseats, callback) {
    newseats = newseats.split(",");
    Turn.findOneAndUpdate({turn_id: turn_id}, {$set: {seats: newseats}}, callback);
}
