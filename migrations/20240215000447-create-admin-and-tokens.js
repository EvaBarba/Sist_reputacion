'use strict';

const { Sequelize } = require('sequelize');
const { User, reputation } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Crear el usuario admin con salt aleatorio
    await User.create({
      username: 'admin',
      password: 'admin',
      role: 'Admin',
      email: 'admin@admin.es',
      numreputations: 3,
      salt: 'adminSalt',
    });

    // Obtener el usuario admin recién creado
    const adminUser = await User.findOne({ where: { username: 'admin' } });

    // Crear 3 reputations y asignarlos al usuario admin
    await Promise.all([
      reputation.create({ user_id: adminUser.user_id }),
      reputation.create({ user_id: adminUser.user_id }),
      reputation.create({ user_id: adminUser.user_id }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Deshacer la migración (DROP TABLE, etc.)
    await queryInterface.dropTable('reputation');
    await queryInterface.dropTable('Users');
  },
};