import { Sequelize } from 'sequelize';

const db = new Sequelize('hade', 'root', 'satrio8502', {
  host: 'localhost',
  dialect: 'mysql',
});

export default db;
