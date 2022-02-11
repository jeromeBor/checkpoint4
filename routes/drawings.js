const express = require("express");
const {
  getAllDrawings,
  getOneDrawing,
  postOneDrawing,
  updateOneDrawing,
  deleteOneDrawing,
  searchByDrawing,
  uploadSingleImage,
  getSingleImage,
} = require("../controllers/drawings.js");

const router = express.Router();
router.get("/", getAllDrawings);
router.get("/:id", getOneDrawing);
router.get("/:searchValue", searchByDrawing);
router.post("/", postOneDrawing);
router.post("/:id/upload", uploadSingleImage);

router.get("/upload/:filename", getSingleImage);

router.put("/:id", updateOneDrawing);
router.delete("/:id", deleteOneDrawing);

module.exports = router;
