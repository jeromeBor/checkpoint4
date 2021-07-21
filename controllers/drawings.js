/* eslint-disable radix */
/* eslint-disable prefer-promise-reject-errors */
const Joi = require('joi');
const drawingsModel = require('../models/drawings');

const postDrawingValidationObject = {
  title: Joi.string().max(255).required(),
  imageLink: Joi.string().max(255).allow(null, ''),
  postContent: Joi.string(),
  dateOfWrite: Joi.number().required(),
  tagsId: Joi.number().integer().required(),
};

const postOneDrawing = (req, res) => {
  const { title, imageLink, postContent, dateOfWrite, tagsId } = req.body;
  const { error } = Joi.object(postDrawingValidationObject).validate(
    { title, imageLink, postContent, dateOfWrite, tagsId },
    { abortEarly: false }
  );
  if (error) {
    console.error(error);
    res.status(422).json({ validationErrors: error.details });
  } else {
    drawingsModel
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

const getAllDrawings = (req, res) => {
  drawingsModel
    .getAllDrawingsQuery()
    .then(([results]) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      console.error(error);
    });
};

const getOneDrawing = (req, res) => {
  const { id } = req.params;
  drawingsModel
    .getOneDrawingQuery(id)
    .then(([results]) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      console.error(error);
    });
};

const updateOneDrawing = (req, res) => {
  const { id } = req.params;
  drawingsModel
    .getOneDrawingQuery(id)
    .then(([results]) => {
      [existingItem] = results;
      if (!existingItem) {
        return Promise.reject('RECORD_NOT_FOUND');
      }
      drawingsModel.deleteOneDrawingQuery, [req.body, id];
    })
    .then(() => {
      res
        .status(200)
        .json({ ...existingItem, ...req.body })
        .send('drawing succefully updated');
    })
    .catch((err) => {
      console.log(err);
      if (err === 'RECORD_NOT_FOUND') {
        res.status(404).send(`drawing with id ${id} not found`);
      } else res.status(500).send('error updating an drawing');
    });
};

const deleteOneDrawing = (req, res) => {
  const { id } = req.params;
  drawingsModel
    .deleteOneDrawingQuery(id)
    .then(([result]) => {
      if (result.affectedRows) {
        res.status(200).send(`drawing with id ${id} deleted`);
      } else {
        res.status(404).send(`drawing with id ${id} not found`);
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('error deleting drawing');
    });
};

module.exports = {
  getAllDrawings,
  postOneDrawing,
  getOneDrawing,
  updateOneDrawing,
  deleteOneDrawing,
};
