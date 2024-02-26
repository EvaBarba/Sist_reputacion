// models/user.js

// Dependencies
const { Sequelize, Model, DataTypes } = require('sequelize');
const crypt = require('../helpers/crypt');
const sequelize = require('../config/database');

// Model definition
class User extends Model {
    verifyPassword(password) {
        return crypt.encryptPassword(password, this.salt) === this.password;
    }
}

// Model initiation
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Username must not be empty.',
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Email must not be empty.',
                },
                unique: {
                    args: true,
                    msg: 'Email must be unique.',
                },
                isEmail: {
                    msg: 'Invalid email format.',
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Password must not be empty.',
                },
            },
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        passwordUpdate: {
            // type: DataTypes.DATETIME (PENDIENTE)
        },
        verifyKeyEmail: {
            type: DataTypes.STRING
        },
        verifyKeyExpire: {
            // type: DataTypes.DATATIME (PENDIENTE)
        },
        enabled: {
            type: DataTypes.BOOLEAN
        },
        extra: {
            type: DataTypes.JSON
        },
        admin_id: {
            type: DataTypes.INTEGER
        },
    },
    {
        sequelize,
        modelName: 'User',
        timestamps: false,
    }
);

// Model export
module.exports = User;