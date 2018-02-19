const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const BusSchema = mongoose.Schema({
    license_plate: {
        type: String,
        required:true
    },
    username: {
        type: String,
        required:true
    },
    route_id: {
        type: String,
        required:true
    },
    type: {
        type: String
    },
    seat_type: {
        type: String
    },
    status: {
        type: String,
        required:true
    }
});

const User = module.exports = mongoose.model('Bus', BusSchema);

module.exports.getBusById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getBusByLicensePlate = function(license_plate, callback) {
    const query = {license_plate: license_plate}
    User.findOne(query, callback);
}

module.exports.addBus = function(newBus, callback) {
    newBus.save(callback);
}
