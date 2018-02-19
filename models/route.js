const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const RouteSchema = mongoose.Schema({
    route_id: {
        type: String,
        required:true
    },
    cities: {
        type: Array,
        required:true
    }
});

const Route = module.exports = mongoose.model('Route', RouteSchema);

module.exports.getRouteById = function(id, callback) {
    Route.findById(id, callback);
}

module.exports.getRouteByRouteId = function(route_id, callback) {
    const query = {route_id: route_id}
    Route.findOne(query, callback);
}

module.exports.addRoute = function(newRoute, callback) {
    newRoute.save(callback);
}