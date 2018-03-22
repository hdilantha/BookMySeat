const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const BookingSchema = mongoose.Schema({
    booking_id: {
        type: String,
        required:true
    },
    turn_id: {
        type: String,
        required:true
    },
    name: {
        type: String,
        required:true
    },
    email: {
        type: String
    },
    telephone: {
        type: String,
        required:true
    },
    nic: {
        type: String,
        required:true
    },
    seats: {
        type: Array,
        required:true
    }
});

const Booking = module.exports = mongoose.model('Booking', BookingSchema);

module.exports.getBookingById = function(id, callback) {
    Booking.findById(id, callback);
}

module.exports.getBookingByBookingId = function(booking_id, callback) {
    const query = {booking_id: booking_id}
    Booking.findOne(query, callback);
}

module.exports.getBookingsByTurnId = function(turn_id, callback) {
    const query = {turn_id: turn_id}
    Booking.find(query, callback);
}

module.exports.addBooking = function(newBooking, callback) {
    newBooking.save(callback);
}
