/* eslint-disable radix */
/* eslint-disable prefer-promise-reject-errors */
const Joi = require('joi');
const tagsModel = require('../models/drawings');

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
    tagModel
      .postOneTagQuery({ ...req.body })
      .then((results) => {
        const idTag = results.insertId;
        const createdTag = { idTag, ...req.body };
        res.status(201).json(tagModel);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('error creating the tag');
      });
  }
};

const getAllTags = (req, res) => {
  tagsModel
    .getAllTagsQuery()
    .then((results) => {
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
      res.status(500).send('error retrieving album');
      console.log(error);
    });
};

const updateOneTag = async (req, res) => {
  const { id } = req.params;
  await newsModel.updateOneTagQuery(id).then(() => {
    tagsModel
      .updateOneTagQuery(id, req.body)
      .then((results) => {
        if (results.affectedRows === 0) {
          throw new Error('RECORD_NOT_FOUND');
        }
        res.status(200).json({ ...results, ...req.body });
      })
      .catch((err) => {
        console.error(err);
        if (err.message === 'RECORD_NOT_FOUND') {
          res.status(404).send(`tag with id ${id} not found`);
        }
        if (err.message === 'INVALID_DATA') {
          res.status(422).json({ validationErrors });
        } else res.status(500).send('error updating a tag');
      });
  });
};

const deleteOneTag = (req, res) => {
  const { id } = req.params;
  tagsModel
    .deleteOneTagQuery(id)
    .then((result) => {
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
