import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const { DataTypes } = Sequelize;

const Users = db.define('users', {
  // field
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  refresh_token: DataTypes.TEXT,
}, {
  // opsi untuk nama tabel tunggal
  freezeTableName: true,
});

export default Users;
