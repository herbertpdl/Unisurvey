'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Questionariorespondido', {
      idQuestionario: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'questionario',
          },
          key: 'id'
        },
        allowNull: false
      },
      idUsuario: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'usuario',
          },
          key: 'id'
        },
        allowNull: false
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Questionariorespondido');
  }
};
