const express = require('express');
const {
  getAllDrawings,
  getOneDrawing,
  postOneDrawing,
  updateOneDrawing,
  deleteOneDrawing,
} = require('../controllers/drawings.js');

const router = express.Router();
router.get('/', getAllDrawings);
router.get('/:id', getOneDrawing);
router.post('/', postOneDrawing);
router.put('/:id', updateOneDrawing);
router.delete('/:id', deleteOneDrawing);

module.exports = router;
