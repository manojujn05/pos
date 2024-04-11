import { Sequelize } from 'sequelize';

// Initialize Sequelize instance
const db = new Sequelize('pos', 'root', '', {
  dialect: 'mysql', 
  host: 'localhost', 
});

export default db;
