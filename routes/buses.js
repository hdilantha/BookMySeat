const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Bus = require('../models/bus');

// Register
router.post('/register', (req, res, next) => {
    let newBus = new Bus({
        license_plate: req.body.license_plate,
        username: req.body.username,
        route_id: req.body.route_id,
        type: req.body.type,
        seat_type: req.body.seat_type,
        status: req.body.status
    });

    Bus.addBus(newBus, (err, bus) => {
        if(err) {
            res.json({success: false, msg:'Failed to register bus'});
        } else {
            res.json({success: true, msg:'Bus registered'});
        }
    });
});

module.exports = router;
