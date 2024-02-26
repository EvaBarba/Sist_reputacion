// models/roles/consultant.js

// Dependencies
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// Model definition
class Consultant extends Model {}

// Model initiation
Consultant.init(
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
    modelName: 'Consultant',
    timestamps: false,
  }
);

// Model export
module.exports = Consultant;