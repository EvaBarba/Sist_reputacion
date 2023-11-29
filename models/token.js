const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Token extends Model {}

    Token.init({
        idToken: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        tokenValue: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: "Token value must be unique."
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Token',
        tableName: 'Token',
        timestamps: false
    });

    return Token;
};