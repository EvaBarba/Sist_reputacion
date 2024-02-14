// createDefaultUsers.js
//Ejecutar:
//node createDefaultUsers.js
const { sequelize, User, Token } = require('../models');

const createDefaultUsers = async () => {
    try {
        await User.create({
            username: 'admin',
            password: 'adminpassword',
            email: 'admin@example.com',
            isAdmin: true,
            numTokens: 0,
            salt: 'somesalt', // Deberías usar una función para generar un salt único
            role: 'Admin'
        });

        await User.create({
            username: 'interpreter',
            password: 'interpreterpassword',
            email: 'interpreter@example.com',
            isAdmin: false,
            numTokens: 0,
            salt: 'somesalt', // Deberías usar una función para generar un salt único
            role: 'Interprete'
        });

        await User.create({
            username: 'client',
            password: 'clientpassword',
            email: 'client@example.com',
            isAdmin: false,
            numTokens: 0,
            salt: 'somesalt', // Deberías usar una función para generar un salt único
            role: 'Cliente'
        });

        console.log('Default users created successfully.');
    } catch (error) {
        console.error('Error creating default users:', error);
    } finally {
        // Cierra la conexión de la base de datos al finalizar
        await sequelize.close();
    }
};

createDefaultUsers();