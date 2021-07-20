const express = require ('express');
const { postDrawings, getDrawings, updateDrawings,deleteDrawings } = require ('../controllers/drawings.js');

const router = express.Router()
router.get('/drawings)
router.get('/:id', getOneNews)
router.post('/', postNews)
router.put('/:id',updateNews)
router.delete('/:id',deleteNews)

module.exports = router
