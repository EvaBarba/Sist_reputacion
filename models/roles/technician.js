// models/roles/technician.js

// Dependencies
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// Model definition
class Technician extends Model {}

// Model initiation
Technician.init(
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
    modelName: 'Technician',
    timestamps: false,
  }
);

// Model export
module.exports = Technician;