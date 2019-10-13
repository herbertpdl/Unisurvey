'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(250)
      },
      password_hash: {
        allowNull: false,
        type: Sequelize.STRING
      },
      course: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      cpf: {
        allowNull: false,
        type: Sequelize.STRING(20)
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('User');
  }
};
