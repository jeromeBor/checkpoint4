/* eslint-disable radix */
/* eslint-disable prefer-promise-reject-errors */
const Joi = require("joi");
const drawingsModel = require("../models/drawings");
// const multer = require("multer");

const postDrawingValidationObject = {
  title: Joi.string().max(255).required(),
  imageLink: Joi.string().max(255).allow(null, ""),
  postContent: Joi.string(),
  dateOfWrite: Joi.number().required(),
  tagsId: Joi.number().integer().required(),
};

const updateDrawingValidationObject = {
  title: Joi.string().max(255),
  idUser: Joi.number().integer(),
  idCategory: Joi.number().integer(),
  imageLink: Joi.string().max(255),
  dateOfWrite: Joi.number().min(1),
  newsContent: Joi.string(),
};

// const storage = multer.diskStorage({
// destination(req, file, cb) {
// if (
//   file.mimetype == "image/png" ||
//   file.mimetype == "image/jpg" ||
//   file.mimetype == "image/jpeg"
// ) {
//   cb(null, `${file.originalname}`);
// } else {
//   cb(null, false);
//   return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
// }
// },
// destination(req, file, cb) {
//   cb(null, "upload");
//   // req.file.path
// },
// filename(req, file, cb) {
//   cb(null, `${file.originalname}`);
// },
// });

// const upload = multer({ storage }).single("file");

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
        console.log("created : ", createdDrawing);

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
      validationErrors = Joi.object(updateDrawingValidationObject).validate(
        req.body,
        { abortEarly: false }
      ).error;
      if (validationErrors) {
        return Promise.reject("INVALID_DATA");
      }
      return results;
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

// const uploadImage = (req, res) => {
//   upload(req, res, (err) => {
//     if (err instanceof multer.MulterError) {
//       console.error(err);
//       res.status(500).json(err);
//     } else if (err) {
//       console.error(err);
//       res.status(500).json(err);
//     } else {
//       const { id } = req.params;
//       const { path } = req.file;
//       updateOneDrawing(id, { imageLink: path });
//       res.status(200).send(req.file);
//     }
//   });
// };

module.exports = {
  getAllDrawings,
  postOneDrawing,
  getOneDrawing,
  updateOneDrawing,
  deleteOneDrawing,
  searchByDrawing,
  // uploadImage,
};
