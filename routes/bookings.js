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
        nic: req.body.nic,
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

router.get('/getbookings', (req, res, next) => {
    Booking.getBookingsByTurnId(req.query.turn_id, (err,resp)  => {
      res.json({bookings: resp});
    });
});

// Remove Bookings
router.post('/remove', (req, res, next) => {
    Booking.removeBookings(req.body.turn_id, (err,resp)  => {
      if(err) {
          res.json({success: false, msg:'Failed to save new details'});
      } else {
          res.json({success: true, msg:'Bookings removed successfully'});
      }
    });
});

module.exports = router;
