import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Users from '../models/UserModel.js';

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ['id', 'name', 'email'],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const Register = async (req, res) => {
  const {
    name, email, password, confPassword, role,
  } = req.body;

  if (!name || !email || !password || !confPassword || !role) return res.status(400).json({ msg: 'Silahkan isi semua field' });
  const emailExists = await Users.findOne({ where: { email: req.body.email } });
  if (emailExists) return res.status(400).json({ msg: 'Email sudah terdaftar, Silahkan login' });
  if (password !== confPassword) return res.status(400).json({ msg: 'Password dan confirm password tidak cocok' });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      name,
      email,
      role,
      password: hashPassword,
    });
    res.json({ msg: 'Register Berhasil' });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: 'wrong password' });
    const userId = user[0].id;
    const { name, role } = user[0];
    const { email } = user[0];
    const accessToken = jwt.sign({
      userId, name, email, role,
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s' });
    const refreshToken = jwt.sign({
      userId, name, email, role,
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

    await Users.update({ refresh_token: refreshToken }, {
      where: {
        id: userId,
      },
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnlye: true,
      maxAge: 24 * 60 * 60 * 1000,

      // jika menggunakan https menggunakan ini
      // secure: true,
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ msg: 'Email tidak ditemukan' });
  }
};

export const logout = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await Users.update({ refresh_token: null }, {
    where: {
      id: userId,
    },
  });
  res.clearCookie('refreshToken');
  return res.sendStatus(200);
};
