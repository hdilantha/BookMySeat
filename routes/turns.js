const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Turn = require('../models/turn');

// Register
router.post('/register', (req, res, next) => {
    const checkID = req.body.turn_id;
    let newTurn = new Turn({
        turn_id: req.body.turn_id,
        license: req.body.license,
        route_id: req.body.route_id,
        email: req.body.email,
        seats: req.body.seats.split(""),
        time: req.body.time,
        date: req.body.date,
        status: "active"
    });
    Turn.getTurnByTurnId(checkID, (err, turn) => {
        if(err) throw err;
        if(turn) {
            res.json({success: false, msg: 'Turn ID already exists'});
        } else {
            Turn.addTurn(newTurn, (err, bus) => {
                if(err) {
                    res.json({success: false, msg:'Failed to register turn'});
                } else {
                    res.json({success: true, msg:'Turn registered'});
                }
            });
        }
    });
});

router.get('/allturns', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    Turn.getAllTurns(req.user.email, (err,resp)  => {
      res.json({turns: resp});
    });
});

module.exports = router;
