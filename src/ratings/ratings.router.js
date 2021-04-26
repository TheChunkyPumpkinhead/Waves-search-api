const express = require('express');
const xss = require('xss');
const path = require('path');
const requireAuth = require('../middleware/jwt-auth');

const RatingsService = require('./ratings.service');

const ratingsRouter = express.Router();
const jsonParser = express.json();

// get all locations
ratingsRouter
  .route('/')
  .get(requireAuth, (req, res, next) => {
    RatingsService.getAllRatings(
      req.app.get('db'),
      req.user.id
    )
      .then(loc => {
        if (!loc) {
          return res.status(404).json({
            error: { message: `rating does not exist` }
          });
        }
        res.json(loc);
      })
      .catch(next);
  });




// get ratings by location id?
ratingsRouter
  .route('/:location_id')
  .get(requireAuth, (req, res, next) => {
    RatingsService.getAllRatingsByLocId(
      req.app.get('db'),
      req.params.location_id
    )
      .then(ratings => {
        if (!ratings) {
          return res.json(
            {
              "location_id": req.params.location_id,
              "average_rating": "1"
            }
          );
        }
        res.json(ratings);
      })
      .catch(next);
  })

  // post a new rating to db 
  .post(requireAuth, jsonParser, (req, res, next) => {
    const { stars } = req.body;
    const newRating = { user_id: req.user.id, stars, location_id: req.params.location_id };

    RatingsService.insertNewRating(
      req.app.get('db'),
      newRating
    )
      .then(loc => {
        res.status(201)
          .json(loc);
      })
      .catch(next);
  });




module.exports = ratingsRouter;