const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const TurnSchema = mongoose.Schema({
    turn_id: {
        type: String,
        required:true
    },
    license_plate: {
        type: String,
        required:true
    },
    route_id: {
        type: String,
        required: true
    },
    seats: {
        type: Array,
        required:true
    },
    times: {
        type: Array,
        required: true
    },
    date: {
        type: Date,
        required:true
    }
});

const Turn = module.exports = mongoose.model('Turn', TurnSchema);

module.exports.getTurnById = function(id, callback) {
    Turn.findById(id, callback);
}

module.exports.getTurnByTurnId = function(turn_id, callback) {
    const query = {turn_id: turn_id}
    Turn.findOne(query, callback);
}

module.exports.addTurn = function(newTurn, callback) {
    newTurn.save(callback);
}
