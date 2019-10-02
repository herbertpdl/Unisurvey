'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Oi', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(250)
      },
      senha: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      curso: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      cpf: {
        allowNull: false,
        type: Sequelize.STRING(20)
      },
      tipo: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      teste: {
        allowNull: false,
        type: Sequelize.STRING(50)
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Users");
  }
};
