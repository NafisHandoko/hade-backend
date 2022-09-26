import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401); // anauthorization
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ msg: 'Anda Belum Login' });
    req.email = decoded.email;
    req.role = decoded.role;
    req.isVerified = decoded.isVerified;
    // cek verifikasi email
    console.log(req.isVerified);
    if (req.isVerified !== true) return res.status(401).json({ msg: 'Anda belum melakukan verifikasi akun email anda !!!' });
    next();
  });
};

export default verifyToken;
