'use strict';

const { Sequelize } = require('sequelize');
const { User } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userTableInfo = await queryInterface.describeTable('Users');
    if (!userTableInfo) {
      throw new Error('La tabla Users no existe.');
    }
    await queryInterface.createTable('Token', {
      idToken: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Nombre de la tabla en la base de datos
        key: 'userId', // Nombre de la clave primaria en el modelo User
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tokens');
  }
};