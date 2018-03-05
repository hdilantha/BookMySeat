const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Bus = require('../models/bus');

// Register
router.post('/register', (req, res, next) => {
    const chkLicense = req.body.license;
    let newBus = new Bus({
        license: req.body.license,
        email: req.body.email,
        type: req.body.type,
        status: req.body.status
    });
    Bus.getBusByLicensePlate(chkLicense, (err, bus) => {
        if(err) throw err;
        if(bus) {
            res.json({success: false, msg: 'License plate already exists'});
        } else {
            Bus.addBus(newBus, (err, bus) => {
                if(err) {
                    res.json({success: false, msg:'Failed to register bus'});
                } else {
                    res.json({success: true, msg:'Bus registered'});
                }
            });
        }
    });
});

router.get('/allbuses', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    Bus.getAllBuses(req.user.email, (err,resp)  => {
      res.json({buses: resp});
    });
});

module.exports = router;
