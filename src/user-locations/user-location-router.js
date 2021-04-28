const express = require('express');
const xss = require('xss');
const path = require('path');
const requireAuth = require('../middleware/jwt-auth');

const UserLocationService = require('./user-location-service');

const userLocationRouter = express.Router();
const jsonParser = express.json();

userLocationRouter
  .route('/')
  .get(requireAuth, (req, res, next) => {
    UserLocationService.getAllLocations(
      req.app.get('db'),
      req.user.id
    )
      .then(user_loc => {
        if (!user_loc) {
          return res.status(404).json({
            error: { message: `Users Location do not exist` }
          });
        }
        res.json(user_loc);
      })
      .catch(next);
  });

// route for getting all locations user has saved
userLocationRouter
  .route('/user')
  .get(requireAuth, (req, res, next) => {
    console.log('words');
    UserLocationService.getLocationsByUser(
      req.app.get('db'),
      req.user.id
    )
      .then(user_loc => {
        if (!user_loc) {
          return res.status(404).json({
            error: { message: `Users Location do not exist` }
          });
        }
        res.json(user_loc);
      })
      .catch(next);
  });


/// routes by id -- middleware for post req above. 
userLocationRouter
  .route('/:loc_id')
  .all((req, res, next) => {
    if (isNaN(parseInt(req.params.loc_id))) {
      return res.status(400).json({
        error: { message: `Invalid id ${req.params.loc_id}` }
      });
    }
    UserLocationService.getLocationsById(
      req.app.get('db'),
      req.params.loc_id
    )
      .then(loc => {
        if (!loc) {
          return res.status(404).json({
            error: { message: `Location does not exist` }
          });
        }
        res.locations = loc;
        next();
      })
      .catch(next);
  })

  .post(requireAuth, jsonParser, (req, res, next) => {
    const location_id = res.locations.id;
    const newUserLoc = { user_id: req.user.id, location_id };

    UserLocationService.insertUserLocation(
      req.app.get('db'),
      newUserLoc
    )
      .then(loc => {
        res
          //display the 201 status code
          .status(201)
          .json(loc);
      })
      .catch(next);
  })


  //get locations by id
  .get((req, res) => {
    res.json(res.locations);
  });



module.exports = userLocationRouter;