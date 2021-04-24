const express = require('express');
const morgan = require('morgan');
const wavezRouter = require('./wavez/wavez-router');
const cors = require('cors');
const { CLIENT_ORIGIN } = require('./config');

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);


const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});