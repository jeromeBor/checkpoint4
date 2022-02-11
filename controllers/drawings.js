/* eslint-disable radix */
/* eslint-disable prefer-promise-reject-errors */
const Joi = require("joi");
const multer = require("../middleware/multer");

const drawingsModel = require("../models/drawings");

const postDrawingValidationObject = {
  title: Joi.string().max(255).required(),
  imageLink: Joi.string().max(255).allow(null, ""),
  postContent: Joi.string(),
  dateOfWrite: Joi.number().required(),
  tagsId: Joi.number().integer().required(),
};

// const updateDrawingValidationObject = {
//   title: Joi.string().max(255),
//   // imageLink: Joi.string().max(255),
//   postContent: Joi.string(),
//   dateOfWrite: Joi.number(),
//   tagsId: Joi.number().integer(),
// };

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
        const idDrawing = results[0].insertId;
        const createdDrawing = { idDrawing, ...req.body };
        res.status(201).json(createdDrawing);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("error creating the drawing post");
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

const searchByDrawing = (req, res) => {
  const { searchValue } = req.params;
  drawingsModel
    .searchDrawingByName(JSON.stringify(searchValue))
    .then(([results]) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      console.error(error);
    });
};

const updateOneDrawing = async (req, res) => {
  const { id } = req.params;
  let validationErrors = null;
  await drawingsModel
    .getOneDrawingQuery(id)
    .then((results) => {
      if (!results) {
        return Promise.reject("RECORD_NOT_FOUND");
      }
      // validationErrors = Joi.object(updateDrawingValidationObject).validate(
      //   req.body,
      //   { abortEarly: false }
      // ).error;
      // if (validationErrors) {
      //   return Promise.reject("INVALID_DATA");
      // }
      // return results;
    })
    .then(() => {
      drawingsModel
        .updateOneDrawingQuery(id, req.body)
        .then((results) => {
          if (results.affectedRows === 0) {
            throw new Error("RECORD_NOT_FOUND");
          }
          res.status(200).json({ ...results, ...req.body });
        })
        .catch((err) => {
          console.error(err);
          if (err.message === "RECORD_NOT_FOUND") {
            res.status(404).send(`Drawing with id ${id} not found`);
          }
          if (err.message === "INVALID_DATA") {
            res.status(422).json({ validationErrors });
          } else res.status(500).send("error updating a drawing");
        });
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
      res.status(500).send("error deleting drawing");
    });
};

const uploadSingleImage = (req, res) => {
  multer.upload(req, res, (err) => {
    if (err instanceof multer.multer.MulterError) {
      console.error(err);
      res.status(500).json(err);
    } else if (err) {
      console.error(err);
      res.status(500).json(err);
    } else {
      const { id } = req.params;
      const { path } = req.file;
      drawingsModel.updateOneDrawingQuery(id, { imageLink: path });
      console.log(path);
      res.status(200).send(req.file);
    }
  });
};

const getSingleImage = (req, res) => {
  const { filename } = req.params;
  const dirname = path.resolve();
  const fullfillpath = path.join(dirname, "upload/" + filename);
  return res.sendFile(fullfillpath);
};

module.exports = {
  getAllDrawings,
  postOneDrawing,
  getOneDrawing,
  updateOneDrawing,
  deleteOneDrawing,
  searchByDrawing,
  uploadSingleImage,
  getSingleImage,
};
