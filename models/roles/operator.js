// models/roles/operator.js

// Dependencies
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// Model definition
class Operator extends Model {}

// Model initiation
Operator.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'Operator',
    timestamps: false,
  }
);

// Model export
module.exports = Operator;