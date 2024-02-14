// models/index.js

const Sequelize = require('sequelize');
const config = require('../config/config');
const { DataTypes } = require('sequelize');
const User = require('./user'); // Manteniendo el nombre original
const Token = require('./token');

// Accede a la configuración de desarrollo
const sequelize = new Sequelize(config.development);

// Relacion 1-N para user-token
User.hasMany(Token, { as: 'tokens', foreignKey: 'userId' });
Token.belongsTo(User, { foreignKey: 'userId' });

const db = { sequelize, User, Token };

// Cierra la conexión de Sequelize cuando el proceso de Node.js se cierre
process.on('exit', () => {
  sequelize.close();
});

module.exports = db;