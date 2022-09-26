import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Users from '../models/UserModel.js';
import nodemailer from 'nodemailer';

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ['id', 'name', 'email', 'role'],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'prassatrio8502@gmail.com',
    pass: 'wieckazhwysouuzs',
  },
});

export const Register = async (req, res) => {
  const {
    name, email, password, confPassword,
  } = req.body;

  if (!name || !email || !password || !confPassword) return res.status(400).json({ msg: 'Silahkan isi semua field' });
  const emailExists = await Users.findOne({ where: { email: req.body.email } });
  if (emailExists) return res.status(400).json({ msg: 'Email sudah terdaftar, Silahkan login' });
  if (password !== confPassword) return res.status(400).json({ msg: 'Password dan confirm password tidak cocok' });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      name,
      email,
      password: hashPassword,
    });
    const templateEmail = {
      from: 'teshade12@gmail.com',
      to: email,
      subject: 'Link Verifikasi Email',
      html: `<p> Silahkan klik link dibawah untuk verifikasi akun anda </p>
    <a href="${process.env.CLIENT_URL}/verfikasi-email/${email}">Klik disini<a/> `,
    };
    transporter.sendMail(templateEmail, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('email berhasil dikirim');
      }
    });
    res.json({ msg: 'Silahkan cek email anda untuk verifikasi akun' });
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
    if (user.isVerified) return res.status(400).json({ msg: 'Silahkan melakukan verifikasi email' });
    const userId = user[0].id;
    const { name, role, isVerified } = user[0];
    const { email } = user[0];
    const accessToken = jwt.sign({
      userId, name, email, role, isVerified,
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s' });
    const refreshToken = jwt.sign({
      userId, name, email, role, isVerified,
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
    console.log(role);

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

export const verifyAccount = async (req, res) => {
  const user = await Users.findOne({
    where: {
      email: req.params.email,
    },
  });
  if (!user) return res.status(404).json({ msg: 'Anda belum melakukan registrasi' });
  user.isVerified = true;
  await user.save();
  return res.status(400).json({ msg: 'Email terverifikasi, silahkan login' });
};
