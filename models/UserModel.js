import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const { DataTypes } = Sequelize;

const Users = db.define('users', {
  // field
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 100],
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  refresh_token: {
    type: DataTypes.TEXT,
  },
  // untuk verifikasi
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  role: {
    type: DataTypes.TEXT,
    defaultValue: 'customer',
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
}, {
  // opsi untuk nama tabel tunggal
  freezeTableName: true,
});

export default Users;
