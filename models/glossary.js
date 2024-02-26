// models/glossary.js

// Dependencies
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Model definition
class Glossary extends Model { }

// Model initiation
Glossary.init(
    {
        id: {
            type: DataTypes.INTEGER,
        },
        order: {
            type: DataTypes.STRING,
        }
    },
    {
        sequelize,
        modelName: 'Glossary',
    }
);

// Model export
module.exports = Glossary;