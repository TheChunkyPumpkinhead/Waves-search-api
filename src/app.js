// external resources
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');

// routers (imports)
const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');
const commentsRouter = require('./comments/comments-router');
const locationRouter = require('./locations/locations.router');
const userLocationRouter = require('./user-locations/user-location-router');
const ratingsRouter = require('./ratings/ratings.router');

// build app object
const app = express();

//morgan settings
const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

// add routes here :) 
//log in route: 
app.use('/api/auth', authRouter);
// sign up route: 
app.use('/api/users', usersRouter);
// to view public locations:
app.use('/api/location', locationRouter);
// to save a public location to your account :
app.use('/api/userloc', userLocationRouter);
// add comments to locations saved to your account:
app.use('/api/comments', commentsRouter);
// ratings 
app.use('/api/ratings', ratingsRouter);


app.get('/', (req, res) => {
  res.send('Hello, world!');
});


app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    response = { message: error.message, error };
  }
  // in production: when get errors you can see by running heroku logs:
  console.error(error);
  res.status(500).json(response);
});

module.exports = app;