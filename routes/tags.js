const express = require('express');
const {
  getAllTags,
  getOneTag,
  postOneTag,
  updateOneTag,
  deleteOneTag,
} = require('../controllers/tags.js');

const router = express.Router();
router.get('/', getAllTags);
router.get('/:id', getOneTag);
router.post('/', postOneTag);
router.put('/:id', updateOneTag);
router.delete('/:id', deleteOneTag);

module.exports = router;
