'use strict';

const { Sequelize } = require('sequelize');
const { User } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userTableInfo = await queryInterface.describeTable('Users');
    if (!userTableInfo) {
      throw new Error('La tabla Users no existe.');
    }
    await queryInterface.createTable('reputation', {
      idreputation: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      reputationValue: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,       // El valor debe ser unico
        validate: {
          notEmpty: {
            msg: 'reputation value must not be empty.',
          },
        },
      },

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Nombre de la tabla en la base de datos
          key: 'user_id', // Nombre de la clave primaria en el modelo User
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('reputations');
  }
};