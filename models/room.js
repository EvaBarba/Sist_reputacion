// models/room.js

// Dependencies
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Technician = require('./roles/technician');
const Operator = require('./roles/operator');
const Coordinator = require('./roles/coordinator');
const Consultant = require('./roles/consultant');

// Model definition
class Room extends Model { }

// Model initiation
Room.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        date: {
            type: DataTypes.DATETIME
        },
        language: {
            type: DataTypes.STRING
        },
        licode_room: {
            type: DataTypes.STRING
        },
        time_start: {
            type: DataTypes.TIME
        },
        time_finish: {
            type: DataTypes.TIME
        },
        place: {
            type: DataTypes.STRING
        },
        ai_enabled: {
            type: DataTypes.BOOLEAN
        },
        on_air: {
            type: DataTypes.STRING
        },
        educational: {
            type: DataTypes.BOOLEAN
        },
        zoom_url: {
            type: DataTypes.STRING
        },

        technicial_id: {
            type: DataTypes.INTEGER,
            // allowNull: false,
            references: {
                model: Technician,
                key: Technician.id,
            },
        },
        operator_id: {
            type: DataTypes.INTEGER,
            // allowNull: false,
            references: {
                model: Operator,
                key: Operator.id,
            },
        },
        coordinator_id: {
            type: DataTypes.INTEGER,
            // allowNull: false,
            references: {
                model: Coordinator,
                key: Coordinator.id,
            },
        },
        consultant_id: {
            type: DataTypes.INTEGER,
            // allowNull: false,
            references: {
                model: Consultant,
                key: Consultant.id,
            },
        },

        assigned_vrc: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        modelName: 'Room',
    }
);

// Model export
module.exports = Room;