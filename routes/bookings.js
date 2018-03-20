const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Booking = require('../models/booking');

// Register
router.post('/register', (req, res, next) => {
    let newBooking = new Booking({
        booking_id: req.body.booking_id,
        turn_id: req.body.turn_id,
        name: req.body.name,
        email: req.body.email,
        telephone: req.body.telephone,
        seats: req.body.seats.split(" ")
    });

    Booking.addBooking(newBooking, (err, bus) => {
        if(err) {
            res.json({success: false, msg:'Failed to register booking'});
        } else {
            res.json({success: true, msg:'Booking registered'});
        }
    });
});

module.exports = router;
