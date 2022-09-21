import jwt from 'jsonwebtoken';
import Users from '../models/UserModel.js';

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.sendStatus(401);
    const user = await Users.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!user[0]) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);
      const userId = user[0].id;
      const { name, email, role } = user[0];
      const accessToken = jwt.sign({
        userId, name, email, role,
      }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
      res.json({ accessToken });
    });
  } catch (error) {
    console.log(error);
  }
};

export default refreshToken;
