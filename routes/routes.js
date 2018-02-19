const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Route = require('../models/route');

// Register
router.post('/register', (req, res, next) => {
    let newRoute = new Route({
        route_id: req.body.route_id,
        cities: req.body.cities
    });

    Route.addRoute(newRoute, (err, bus) => {
        if(err) {
            res.json({success: false, msg:'Failed to register route'});
        } else {
            res.json({success: true, msg:'Route registered'});
        }
    });
});

module.exports = router;
