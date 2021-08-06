const express = require('express');
const {
  getAllDrawings,
  getOneDrawing,
  postOneDrawing,
  updateOneDrawing,
  deleteOneDrawing,
  SearchByDrawing,
} = require('../controllers/drawings.js');

const router = express.Router();
router.get('/', getAllDrawings);
router.get('/:id', getOneDrawing);
router.get('/admin/dashboard/:drawingName', SearchByDrawing);
router.post('/', postOneDrawing);
router.put('/:id', updateOneDrawing);
router.delete('/:id', deleteOneDrawing);

module.exports = router;
