/* eslint-disable radix */
/* eslint-disable prefer-promise-reject-errors */
const Joi = require('joi');
const drawingsModel = require('../models/drawings');

const postDrawingValidationObject = {
  title: Joi.string().max(255).required(),
  imageLink: Joi.string().max(255).allow(null, ''),
  newsContent: Joi.string().required(),
  dateOfWrite: Joi.number().required(),
  tagsId: Joi.string().required(),
};

const postOneDrawing = (req, res) => {
  const { title, imageLink, newsContent, dateOfWrite, tagsId } = req.body;
  const { error } = Joi.object(postDrawingValidationObject).validate(
    { title, imageLink, newsContent, dateOfWrite, tagsId },
    { abortEarly: false }
  );
  if (error) {
    console.error(error);
    res.status(422).json({ validationErrors: error.details });
  } else {
    newsModel
      .postOneDrawingQuery({ ...req.body })
      .then((results) => {
        const idDrawing = results.insertId;
        const createdDrawing = { idDrawing, ...req.body };
        res.status(201).json(createdDrawing);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('error creating the drawing post');
      });
  }
};

const getAllDrawing = (req, res) => {
  drawingsModel
    .getAllDrawingQuery()
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      res.status(500).send('error retrieving drawings');
      console.log(error);
    });
};

const getOneDrawing = (req, res) => {
  const { id } = req.params;
  newsModel
    .getOneDrawingQuery(id)
    .then(([results]) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      res.status(500).send('error retrieving album');
      console.log(error);
    });
};

const updateOneDrawing = async (req, res) => {
  const { id } = req.params;
  await newsModel.updateDrawingQuery(id).then(() => {
    newsModel
      .updateNewsQuery(id, req.body)
      .then((results) => {
        if (results.affectedRows === 0) {
          throw new Error('RECORD_NOT_FOUND');
        }
        res.status(200).json({ ...results, ...req.body });
      })
      .catch((err) => {
        console.error(err);
        if (err.message === 'RECORD_NOT_FOUND') {
          res.status(404).send(`drawing with id ${id} not found`);
        }
        if (err.message === 'INVALID_DATA') {
          res.status(422).json({ validationErrors });
        } else res.status(500).send('error updating a drawing');
      });
  });
};

const deleteOneDrawing = (req, res) => {
  const { id } = req.params;
  newsModel
    .deleteDrawingQuery(id)
    .then((result) => {
      if (result.affectedRows) {
        res.status(200).send('drawing deleted');
      } else {
        res.status(404).send('drawing not found');
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('error deleting the drawing');
    });
};

module.exports = {
  getAllDrawings,
  postOneDrawing,
  getOneDrawing,
  updateOneDrawing,
  deleteOneDrawing,
};
