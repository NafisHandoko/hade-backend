import express from 'express'

// controller functions
import { 
    loginUser, 
    signupUser 
} from '../controllers/AuthController.js'

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

export default router