// models/user.js

const { Sequelize, Model, DataTypes } = require('sequelize');
const crypt = require('../helpers/crypt');
const sequelize = require('../config/database');

class User extends Model {
    verifyPassword(password) {
        return crypt.encryptPassword(password, this.salt) === this.password;
    }
}

User.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
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
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Username must be unique.',
            },
            validate: {
                notEmpty: {
                    msg: 'Username must not be empty.',
                },
            },
        },
        phoneNumber: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Email must not be empty.',
                },
                isEmail: {
                    msg: 'Invalid email format.',
                },
            },
        },
        numTokens: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('Admin', 'Interprete', 'Cliente'),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
        timestamps: false,
    }
);

module.exports = User;