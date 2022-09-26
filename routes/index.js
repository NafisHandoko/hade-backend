import express from 'express';
import {
  getUsers, login, logout, Register, verifyAccount,
} from '../controllers/Users.js';
import verifyToken from '../middleware/verifyToken.js';
import refreshToken from '../controllers/refreshToken.js';
import verifyRoles from '../middleware/authRoles.js';

const router = express.Router();

// verifyToken berguna jika ingin verifikasi token agar bisa login
// verifyRoles('admin') jika ingin hanya admin yang dapat akses
// verifyRoles('customer') jika ingin hanya customer yang dapat akses dst seperti matpro dan builder

router.get('/users', verifyToken, verifyRoles('admin'), getUsers);
router.post('/users', Register);
router.post('/login', login);
router.get('/token', refreshToken);
router.delete('/logout', logout);
router.get('/verfikasi-email/:email', verifyAccount);

export default router;
