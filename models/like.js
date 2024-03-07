// models/like.js

// Dependencies
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Interpreter = require('./roles/interpreter');
const Room = require('./room');
const constants = require('../helpers/constants.js');

const rolesEnum = constants.ROLES;

// Model definition
class Like extends Model { }

// Model initiation
Like.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        from_id: {                      //(PENDIENTE) interpreter, operator, tech?
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Interpreter,
                key: Interpreter.id,
            },
        },
        to_id: {                      //(PENDIENTE) interpreter, operator, tech?
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Interpreter,
                key: Interpreter.id,
            },
        },
        from_type: {
            type: DataTypes.ENUM(...Object.values(rolesEnum)),
            allowNull: false
        },
        to_type: {
            type: DataTypes.ENUM(...Object.values(rolesEnum)),
            allowNull: false
        },
        value: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 5,
            },
        },
        room_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Room,
                key: Room.id,
            },
        }
    },
    {
        sequelize,
        modelName: 'Like',
    }
);

// Model export
module.exports = Like;