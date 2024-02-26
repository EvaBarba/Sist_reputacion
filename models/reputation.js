// models/reputation.js

// Dependencies
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Interpreter = require('./roles/interpreter');

// Model definition
class Reputation extends Model {}

// Model initiation
Reputation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    interpreter_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Interpreter,     // Name of the model referred to
        key: Interpreter.id,    // Name of the primary key in the Interpreter model
      },
    },
    value: {
      type: DataTypes.INTEGER,  // (PENDIENTE) tipo DOUBLE mejor??
    },
  },
  {
    sequelize,
    modelName: 'Reputation',
  }
);

// Model export
module.exports = Reputation;