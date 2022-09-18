import express from 'express'
const router = express.Router()
import {
    getDesigns, getDesign, postDesign, updateDesign, deleteDesign 
} from '../controllers/DesignController.js'


router.get('/', getDesigns)
router.get('/:id', getDesign)
router.post('/', postDesign)
router.patch('/:id', updateDesign)
router.delete('/:id', deleteDesign)

// module.exports = router
export default router