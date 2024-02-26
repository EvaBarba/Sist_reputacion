// models/boothAssignment.js

// Dependencies
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Interpreter = require('./roles/interpreter');
const Booth = require('./booth');

// Model definition
class BoothAssignment extends Model { }

// Model initiation
BoothAssignment.init(
    {
        interpreter_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Interpreter,
                key: Interpreter.id,
            },
        },
        booth_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Booth,
                key: Booth.id,
            },
        }
    },
    {
        sequelize,
        modelName: 'BoothAssignment',
    }
);

// Model export
module.exports = BoothAssignment;