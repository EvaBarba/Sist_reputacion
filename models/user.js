// Importa Sequelize
const { Sequelize, DataTypes } = require('sequelize');

// Conecta a tu base de datos MySQL
const sequelize = new Sequelize('BBDD_reputacion', 'tu_usuario', 'tu_contraseña', {
    host: 'localhost',
    dialect: 'mysql'
});

// Define el modelo User
const User = sequelize.define('User', {
    Id_User: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Password: {
        type: DataTypes.STRING(55),
        allowNull: false
    },
    Nombre: {
        type: DataTypes.STRING(55),
        allowNull: false
    },
    PhoneNumber: {
        type: DataTypes.STRING(55)
    },
    Email: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    // Opciones del modelo
    tableName: 'User', // Nombre de la tabla en la base de datos
    timestamps: false // No hay campos de fecha y hora en mi tabla
});

// Sincroniza el modelo con la base de datos (esto crea la tabla si no existe)
sequelize.sync();

// Exporta el modelo User
module.exports = User;