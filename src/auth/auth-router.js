// log in router

const express = require('express');
const AuthService = require('./auth-service');

const authRouter = express.Router();
const jsonBodyParser = express.json();

authRouter
  // post log in of user 
  .post('/login', jsonBodyParser, (req, res, next) => {

    const {
      email,
      password
    } = req.body;
    const loginUser = {
      email,
      password
    };

    for (const [key, value] of Object.entries(loginUser))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });
        // console.log("hello 4")
    AuthService.getUserWithUserName(
      req.app.get('db'),
      loginUser.email
    )
      .then(dbUser => {
        console.log("hello")
        if (!dbUser)
          return res.status(400).json({
            error: `Incorrect Email or Password`,
          });
        return AuthService.comparePasswords(loginUser.password, dbUser.password)
          .then(compareMatch => {
            if (!compareMatch)
              return res.status(400).json({
                error: `Incorrect Email or Password`,
              });

            const sub = dbUser.email;
            const payload = {
              user_id: dbUser.id
            };
            res.send({
              authToken: AuthService.creatJWT(sub, payload),
              userId: dbUser.id
            });
          });
      })
      .catch(next);
  });


module.exports = authRouter; 