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
        cities: req.body.cities,
        return: req.body.return,
        email: req.body.email,
        seats: req.body.seats.split(""),
        stime: req.body.stime,
        dtime: req.body.dtime,
        date: req.body.date,
        ddate: req.body.ddate,
        price: req.body.price,
        status: req.body.status
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

router.get('/allturnsadmin', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    Turn.getAllTurnsAdmin((err,resp)  => {
      res.json({turns: resp});
    });
});

router.get('/getturn', (req, res, next) => {
    Turn.getTurnByTurnId(req.query.turn_id, (err,resp)  => {
      res.json(resp);
    });
});

router.get('/markseats', (req, res, next) => {
    Turn.setSeats(req.query.turn_id, req.query.seats, (err,resp)  => {
      if(err) {
          res.json({success: false, msg:'Failed to mark seats'});
      } else {
          res.json({success: true, msg:'Seats marked'});
      }
    });
});

router.get('/searchturns', (req, res, next) => {
    Turn.getTurnByRotue(req.query.starting, req.query.destination, req.query.date, (err,resp)  => {
      res.json({turns: resp});
    });
});

// Remove Turn
router.post('/remove', (req, res, next) => {
    Turn.removeTurn(req.body.turn_id, (err,resp)  => {
      if(err) {
          res.json({success: false, msg:'Failed to save new details'});
      } else {
          res.json({success: true, msg:'Turn removed successfully'});
      }
    });
});

module.exports = router;
