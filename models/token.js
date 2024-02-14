// models/token.js

const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

class Token extends Model {
  // Poner algo?
}


Token.init(
  {
    idToken: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, // Nombre del modelo al que se hace referencia
        key: 'userId', // Nombre de la clave primaria en el modelo User
      },
    },
  },
  {
    sequelize,
    modelName: 'Token',
  }
);

module.exports = Token;