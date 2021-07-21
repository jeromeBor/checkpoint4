/* eslint-disable radix */
/* eslint-disable prefer-promise-reject-errors */
const Joi = require('joi');
const tagsModel = require('../models/tags');

const postTagValidationObject = {
  title: Joi.string().max(255).required(),
};

const postOneTag = (req, res) => {
  const { title } = req.body;
  const { error } = Joi.object(postTagValidationObject).validate(
    { title },
    { abortEarly: false }
  );
  if (error) {
    console.error(error);
    res.status(422).json({ validationErrors: error.details });
  } else {
    tagsModel
      .postOneTagQuery({ ...req.body })
      .then((results) => {
        const idTag = results.insertId;
        const createdTag = { idTag, ...req.body };
        res.status(201).json(createdTag);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('error creating the tag ');
      });
  }
};

const getAllTags = (req, res) => {
  tagsModel
    .getAllTagsQuery()
    .then(([results]) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      res.status(500).send('error retrieving tags');
      console.log(error);
    });
};

const getOneTag = (req, res) => {
  const { id } = req.params;
  tagsModel
    .getOneTagQuery(id)
    .then(([results]) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      res.status(500).send('error retrieving tags');
      console.log(error);
    });
};

const updateOneTag = (req, res) => {
  const { id } = req.params;
  tagsModel
    .getOneTagQuery(id)
    .then(([results]) => {
      [existingItem] = results;
      if (!existingItem) {
        return Promise.reject('RECORD_NOT_FOUND');
      }
      tagsModel.deleteOneDrawingQuery, [req.body, id];
    })
    .then(() => {
      res
        .status(200)
        .json({ ...existingItem, ...req.body })
        .send('tag succefully updated');
    })
    .catch((err) => {
      console.log(err);
      if (err === 'RECORD_NOT_FOUND') {
        res.status(404).send(`tag with id ${id} not found`);
      } else res.status(500).send('error updating a tag');
    });
};

const deleteOneTag = (req, res) => {
  const { id } = req.params;
  tagsModel
    .deleteOneTagQuery(id)
    .then(([result]) => {
      if (result.affectedRows) {
        res.status(200).send(`tag with id ${id} deleted`);
      } else {
        res.status(404).send(`tag with id ${id} not found`);
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('error deleting the tag');
    });
};

module.exports = {
  getAllTags,
  postOneTag,
  getOneTag,
  updateOneTag,
  deleteOneTag,
};
