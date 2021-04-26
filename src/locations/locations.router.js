const express = require('express');
const xss = require('xss');
const path = require('path');
const requireAuth = require('../middleware/jwt-auth');

const LocationService = require('./locations.service');

const locationRouter = express.Router();
const jsonParser = express.json();

// get all locations
locationRouter
  .route('/')
  .get(requireAuth, (req, res, next) => {
    LocationService.getAllLocations(
      req.app.get('db'),
      req.user.id
    )
      .then(loc => {
        if (!loc) {
          return res.status(404).json({
            error: { message: `location does not exist` }
          });
        }
        res.json(loc);
      })
      .catch(next);
  })

  // post a new location to db 
  .post(requireAuth, jsonParser, (req, res, next) => {
    const { title, content, keyword, image } = req.body;
    const newLocation = { user_id: req.user.id, title, content, keyword, image };

    LocationService.insertNewLocation(
      req.app.get('db'),
      newLocation
    )
      .then(loc => {
        res.status(201)
          .json(newLocation);
      })
      .catch(next);
  });






// filter by search word - get request
locationRouter
  .route('/keyword/:searchTerm')
  .all((req, res, next) => {
    const { searchTerm } = req.params;
    // console.log(searchTerm)
    LocationService.getItemsByKeyword(req.app.get('db'), req.params.searchTerm)
      // console.log('after locservice', searchTerm)
      .then(loc => {
        if (!loc) {
          return res.status(404).json({
            error: { message: `Location doesn't exist` },
          });
        }
        res.loc = loc;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(res.loc);
  });

/////////////////////// PATCH TO EDIT LOCATION POST ////////////////////////////////////////
////////// to edit your location posts ////////////////////////////////////////////////////
locationRouter
  .route('/:location_id')
  .all((req, res, next) => {
    if (isNaN(parseInt(req.params.location_id))) {
      //if there is an error show it
      return res.status(404).json({
        error: {
          message: `Invalid id`
        }
      });
    }

    //connect to the service to get the data
    LocationService.getLocationsById(
      req.app.get('db'),
      req.params.location_id
    )
      .then(location => {
        if (!location) {
          //if there is an error show it
          return res.status(404).json({
            error: {
              message: `Location doesn't exist`
            }
          });
        }
        res.location = location;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {

    //get each one of the objects from the results and serialize them
    res.json(res.location);
  })
  //relevant
  .patch(jsonParser, (req, res, next) => {

    //take the input from the user
    const {
      title,
      completed
    } = req.body;
    const locationToUpdate = {
      title,
      completed
    };

    //validate the input by checking the length of the locationToUpdate object to make sure that we have all the values
    const numberOfValues = Object.values(locationToUpdate).filter(Boolean).length;
    if (numberOfValues === 0) {
      //if there is an error show it
      return res.status(400).json({
        error: {
          message: `Request body must content either 'title' or 'completed'`
        }
      });
    }

    //save the input in the db
    LocationService.updateLocation(
      req.app.get('db'),
      req.params.location_id,
      locationToUpdate
    )
      .then(updatedLocation => {

        //get each one of the objects from the results and serialize them
        res.status(200).json(updatedLocation);
      })
      .catch(next);
  });



module.exports = locationRouter;