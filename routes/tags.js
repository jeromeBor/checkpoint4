const express = require('express');
const {
  postTags,
  getTags,
  getOneTags,
  updateTags,
  deleteTags,
} = require('../controllers/tags.js');

const router = express.Router();
router.get('/', getTags);
router.get('/:id', getOneTags);
router.post('/', postTags);
router.put('/:id', updateTags);
router.delete('/:id', deleteTags);

module.exports = router;
