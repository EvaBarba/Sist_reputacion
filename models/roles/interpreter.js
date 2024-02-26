// models/roles/interpreter.js

// Dependencies
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// Model definition
class Interpreter extends Model {}

// Model initiation
Interpreter.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    }
    
    // Languages (PENIENTE)

  },
  {
    sequelize,
    modelName: 'Interpreter',
    timestamps: false,
  }
);

// Model export
module.exports = Interpreter;