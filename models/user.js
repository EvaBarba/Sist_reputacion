const { Model, DataTypes } = require('sequelize');
const crypt = require('../helpers/crypt');

module.exports = (sequelize) => {
    class User extends Model {
        verifyPassword(password) {
            return crypt.encryptPassword(password, this.salt) === this.password;
        }
    }

    User.init({
        idUser: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Password must not be empty."
                }
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: "Username must be unique."
            },
            validate: {
                notEmpty: {
                    msg: "Username must not be empty."
                }
            }
        },
        phoneNumber: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Email must not be empty."
                },
                isEmail: {
                    msg: "Invalid email format."
                }
            }
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        numTokens: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'User', // Nombre del modelo en singular
        tableName: 'User', // Nombre de la tabla en la base de datos
        timestamps: false // Desactivar timestamps (createdAt, updatedAt)
    });

    return User;
};