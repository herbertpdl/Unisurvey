'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Disciplina',{
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
      professor: {
        allowNull: false,
        type: Sequelize.STRING(50)
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Disciplina');
  }
};
