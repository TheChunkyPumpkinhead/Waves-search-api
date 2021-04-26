const express = require('express');
const xss = require('xss');
const path = require('path');

//service import it 
const CommentsService = require('./comments-service');
const requireAuth = require('../middleware/jwt-auth');
const { on } = require('process');

//router + json parser
const commentsRouter = express.Router();
const jsonParser = express.json();


//routes
// get all notes 
commentsRouter
  .route('/')
  .get(requireAuth, (req, res, next) => {
    CommentsService.getCommentsByUser(
      req.app.get('db'),
      req.user.id
    )
      .then(comment => {
        res.json(comment.map(CommentsService.serializeComment));
      })
      .catch(next);
  });


// get comments by location id?
commentsRouter
  .route('/:location_id')
  .get(requireAuth, (req, res, next) => {
    CommentsService.getAllCommentsByLocId(
      req.app.get('db'),
      req.params.location_id
    )
      .then(comments => {
        if (!comments) {
          return res.status(400).json({
            error: { message: `comment does not exist` }
          });
        }
        res.json(comments.map(CommentsService.serializeComment));
      })
      .catch(next);
  })


  // post new comment 
  .post(requireAuth, jsonParser, (req, res, next) => {
    const author_id = req.user.id;
    const { title, content, location_id } = req.body;
    const newComment = { title, content, user_location_id: location_id, author_id };

    for (const [key, value] of Object.entries(newComment))
      if (value === null)
        return res.status(400).json({
          error: `missing ${key} in request body`
        });
    //send data to service to save in the db:
    CommentsService.insertComment(
      req.app.get('db'),
      newComment
    )
      .then(comment => {
        const commentPath = path.posix.join(req.originalUrl, `/${comment.id}`);
        const serializeComment = CommentsService.serializeComment(comment);
        res
          .status(201)
          .location(commentPath)
          .json(serializeComment);
      })
      .catch(err => {
        next(err);
      });
  })

  .delete((req, res, next) => {
    const { location_id } = req.params;
    CommentsService.deleteComment(req.app.get("db"), location_id)
      .then((numRowsAffected) => {
        // logger.info(`Note with id ${id} deleted.`);
        res.json({
          error: { message: `comment with id ${location_id} deleted.` }
        });
        res.status(204).end();
      })
      .catch(next);
  });




module.exports = commentsRouter;