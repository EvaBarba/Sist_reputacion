// models/timeSlot.js

// Dependencies
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

// Model definition
class TimeSlot extends Model { }

// Model initiation
TimeSlot.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        date: {
            type: DataTypes.DATE,
        },
        assigned: {
            type: DataTypes.BOOLEAN,  // (PENDIENTE)
            defaultValue: false,      // (PENDIENTE) cuando esta disponible --> true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: User.id,
            },
        },
    },
    {
        sequelize,
        modelName: 'TimeSlot',
    }
);

// Model export
module.exports = TimeSlot;