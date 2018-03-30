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

module.exports.getAllRoutes = function(callback) {
    Route.find({}, callback);
}

module.exports.editRoute = function(newRoute, callback) {
  const query = {route_id: newRoute.route_id};
  const values = {cities: newRoute.cities};
  Route.update(query, values, (err, values) => {
    if (err) throw err;
    callback(null, values);
  });
}

module.exports.removeRoute = function(route_id, callback) {
  const query = {route_id: route_id};
  Route.remove(query, (err, values) => {
    if (err) throw err;
    callback(null, values);
  });
}
