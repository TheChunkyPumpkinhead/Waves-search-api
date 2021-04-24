const path = require('path');
const express = require('express');
const xss = require('xss');




const WavezService = require('./wavez-service');

const WavezRouter = express.Router();
const jsonParser = express.json();


const serializeWavez=wavez => ({
  id: wavez .id,
  date_published: wavez .date_published,
  title: xss(wavez .title),
  content: xss(wavez .content),
 city:xss(wavez .city),
});


WavezRouter
  .route('/')
  .get((req, res, next) => {

    const knexInstance = req.app.get('db');
    
    WavezService.getAllNotes(knexInstance)
      .then(wavez => {
        res.json(wavez .map(serializeWavez));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
  
    const { title, content, city} = req.body;
    const newWavez = { title, content, city };

   
    for (const [key, value] of Object.entries(newWavez))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        });

 
    WavezService.insertNote(
      req.app.get('db'),
    
      newWavez 
    )
    
      .then(wavez  => {
        console.log('req.originalUrl', req.originalUrl);
        res
          .status(201)
          
          .location(path.posix.join(req.originalUrl, `/${wavez .id}`))
          .json(serializeWavez(wavez ));
      })
      .catch(next);
  });


WavezRouter
  .route('/:wavez _id')
  .all((req, res, next) => {
   
    const { wavez_id } = req.params;
    const knexInstance = req.app.get('db');

    WavezService.getById(knexInstance, wavez_id)
      .then(note => {
        if (!note) {
          return res.status(404).json({
            error: { message: 'Note Not Found' }
          });
        }
       
        res.wavez = wavez ;
        next();
      })
      .catch(next);
  })
  .get((req, res) => {
  
    res.json(serializeWavez(res.wavez ));
  })
  .delete((req, res, next) => {
 
    const { wavez_id } = req.params;
    const knexInstance = req.app.get('db');

    WavezService.deleteNote(knexInstance,wavez_id)
      .then(numRowsAffected => {
        res.status(204).end;
      })
      .catch(next);
  })
  .patch(jsonParser, (req, res, next) => {
  
    const { title,content,city } = req.body;
    const wavezToUpdate = { title,content,city };


    const numberOfValues = Object.values(wavezToUpdate).filter(Boolean).length;
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must contain either, 'title'`
        }
      });

   
   WavezService.updateWavez(
      req.app.get('db'),
    
      req.params.wavez_id,
      wavezToUpdate
    )
      .then(numRowsAffected => {
        console.log('numrows affected', numRowsAffected);
        res.status(204).end();
      })
      .catch(next);
  });

  module.exports = WavezRouter;
  // 1234