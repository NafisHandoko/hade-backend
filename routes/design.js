const express = require('express')
const router = express.Router()
const { getDesigns, getDesign, postDesign, updateDesign, deleteDesign } = require('../controllers/c_quote')


router.get('/', getDesigns)
router.get('/:id', getDesign)
router.post('/', postDesign)
router.patch('/:id', updateDesign)
router.delete('/:id', deleteDesign)

module.exports = router