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
        owner: req.body.owner,
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

// Edit
router.post('/edit', (req, res, next) => {
    let newBus = new Bus({
        license: req.body.license,
        owner: req.body.owner,
        type: req.body.type
    });
    Bus.editBus(newBus, (err, user) => {
        if(err) {
            res.json({success: false, msg:'Failed to save new details'});
        } else {
            res.json({success: true, msg:'Bus edited successfully'});
        }
    });
});

router.get('/allbuses', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    Bus.getAllBuses(req.user.email, (err,resp)  => {
      res.json({buses: resp});
    });
});

// Remove Bus
router.post('/remove', (req, res, next) => {
    Bus.removeBus(req.body.license, (err,resp)  => {
      if(err) {
          res.json({success: false, msg:'Failed to save new details'});
      } else {
          res.json({success: true, msg:'Bus removed successfully'});
      }
    });
});

module.exports = router;
