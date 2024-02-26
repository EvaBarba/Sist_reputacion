// models/glossaryAssignment.js

// Dependencies
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Interpreter = require('./roles/interpreter');
const Glossary = require('./glossary');

// Model definition
class GlossaryAssignment extends Model { }

// Model initiation
GlossaryAssignment.init(
    {
        interpreter_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Interpreter,
                key: Interpreter.id,
            },
        },
        glossary_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Glossary,
                key: Glossary.id,
            },
        }
    },
    {
        sequelize,
        modelName: 'GlossaryAssignment',
    }
);

// Model export
module.exports = GlossaryAssignment;