const express = require('express');
const {
  postDrawings,
  getDrawings,
  getOneDrawings,
  updateDrawings,
  deleteDrawings,
} = require('../controllers/drawings.js');

const { updateDrawingsQuery } = require('../models/drawings.js');

const router = express.Router();
router.get('/', getDrawings);
router.get('/:id', getOneDrawings);
router.post('/', postNews);
router.put('/:id', updateDrawings);
router.delete('/:id', deleteDrawings);

module.exports = router;
