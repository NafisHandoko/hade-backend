import express from 'express';
import {
  getUsers, login, logout, Register,
} from '../controllers/Users.js';
import verifyToken from '../middleware/verifyToken.js';
import refreshToken from '../controllers/refreshToken.js';

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', login);
router.get('/token', refreshToken);
router.delete('/logout', logout);

export default router;