const express = require('express');
const path = require('path');

//connect to service 
const UserService = require('./users-service');

const usersRouter = express.Router();
const jsonBodyParser = express.json();

//all users: 
usersRouter
  .route('/')
  .get((req, res, next) => {
    UserService.getAllUsers(req.app.get('db'))
      .then(user => {
        res.json(user);
      })
      .catch(next);
  })

  // post registering users: 
  .post(jsonBodyParser, (req, res, next) => {
    const { email, password } = req.body;

    for (const field of ['email', 'password'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        });
    const passwordError = UserService.validatePassword(password);

    if (passwordError)
      return res.status(400)
        .json({ error: passwordError });

    UserService.hasUserWithUserName(
      req.app.get('db'),
      email
    )
      .then(hasUserWithUserName => {
        if (hasUserWithUserName)
          return res.status(400)
            .json({ error: `Username already taken` });

        return UserService.hashPassword(password)
          .then(hashedPassword => {
            const newUser = {
              email,
              password: hashedPassword,
            };
            return UserService.insertUser(
              req.app.get('db'),
              newUser
            )
              .then(user => {
                res
                  .status(201)
                  .json(UserService.serializeUser(user));
              });
          });
      })
      .catch(next);
  });



// individual users by id
usersRouter
  .route('/:user_id')
  .all((req, res, next) => {
    const { user_id } = req.params;
    UsersService.getById(req.app.get('db'), user_id)
      .then(user => {
        if (!user) {
          return res
            .status(404)
            .send({ error: { message: `User does not exist` } });
        }
        res.user = user;
        next();
      })
      .catch(next);
  })
  .get((req, res) => {
    res.json(UsersService.serializeUser(res.user));
  })
  .delete((req, res, next) => {
    const { user_id } = req.params;
    UsersService.deleteUser(
      req.app.get('db'),
      user_id
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  });
module.exports = usersRouter;