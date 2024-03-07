// models/languageKnown.js

// Dependencies
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Model definition
class LanguageKnown extends Model { }

// Model initiation
LanguageKnown.init(
    {
        // (PENDIENTE) CAMBIAR
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        }
    },
    {
        sequelize,
        modelName: 'LanguageKnown',
    }
);

// Model export
module.exports = LanguageKnown;