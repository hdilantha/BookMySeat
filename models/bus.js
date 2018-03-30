const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const BusSchema = mongoose.Schema({
    license: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    type: {
        type: String,
        required:true
    },
    owner: {
        type: String,
    },
    status: {
        type: String,
        required:true
    }
});

const Bus = module.exports = mongoose.model('Bus', BusSchema);

module.exports.getBusById = function(id, callback) {
    Bus.findById(id, callback);
}

module.exports.getBusByLicensePlate = function(license, callback) {
    const query = {license: license}
    Bus.findOne(query, callback);
}

module.exports.addBus = function(newBus, callback) {
    newBus.save(callback);
}

module.exports.getAllBuses = function(email, callback) {
    Bus.find({email: email, status: 'active'}, callback);
}

module.exports.editBus = function(newBus, callback) {
  const query = {license: newBus.license};
  const values = {owner: newBus.owner, type: newBus.type};
  Bus.update(query, values, (err, values) => {
    if (err) throw err;
    callback(null, values);
  });
}

module.exports.removeBus = function(license, callback) {
  const query = {license: license};
  Bus.remove(query, (err, values) => {
    if (err) throw err;
    callback(null, values);
  });
}
