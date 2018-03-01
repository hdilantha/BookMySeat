const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Turn = require('../models/turn');

// Register
router.post('/register', (req, res, next) => {
    let newTurn = new Turn({
        turn_id: req.body.turn_id,
        license_plate: req.body.license_plate,
        route_id: req.body.route_id,
        seats: req.body.seats,
        times: req.body.times,
        date: req.body.date
    });

    Turn.addTurn(newTurn, (err, bus) => {
        if(err) {
            res.json({success: false, msg:'Failed to register turn'});
        } else {
            res.json({success: true, msg:'Turn registered'});
        }
    });
});



module.exports = router;
