const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Route = require('../models/route');

// Register
router.post('/register', (req, res, next) => {
    let newRoute = new Route({
        route_id: req.body.route_id,
        cities: req.body.cities.split(" ")
    });
    Route.getRouteByRouteId(req.body.route_id, (err, route) => {
        if(err) throw err;
        if(route) {
            res.json({success: false, msg: 'Route already exists'});
        } else {
          Route.addRoute(newRoute, (err, bus) => {
              if(err) {
                  res.json({success: false, msg:'Failed to register route'});
              } else {
                  res.json({success: true, msg:'Route registered'});
              }
          });
        }
    });
});

router.get('/allroutes', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    Route.getAllRoutes((err,resp)  => {
      res.json({routes: resp});
    });
});

module.exports = router;
