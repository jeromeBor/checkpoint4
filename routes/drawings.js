const express = require("express");
const multer = require("multer");
const {
  getAllDrawings,
  getOneDrawing,
  postOneDrawing,
  updateOneDrawing,
  deleteOneDrawing,
  searchByDrawing,
} = require("../controllers/drawings.js");

const { updateOneDrawingQuery } = require("../models/drawings.js");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "upload");
    // req.file.path
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage }).single("file");

const router = express.Router();
router.get("/", getAllDrawings);
router.get("/:id", getOneDrawing);
router.get("/:searchValue", searchByDrawing);
router.post("/", postOneDrawing);
router.post("/:id/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.error(err);
      res.status(500).json(err);
    } else if (err) {
      console.error(err);
      res.status(500).json(err);
    } else {
      const { id } = req.params;
      const { path } = req.file;
      updateOneDrawingQuery(id, { imageLink: path });
      res.status(200).send(req.file);
    }
  });
});

router.put("/:id", updateOneDrawing);
router.delete("/:id", deleteOneDrawing);

module.exports = router;
