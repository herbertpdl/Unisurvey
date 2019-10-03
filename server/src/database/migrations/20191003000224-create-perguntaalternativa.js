'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Perguntaalternativa', {
      idPergunta: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'pergunta',
          },
          key: 'id'
        },
        allowNull: false
      },
      idAlternativa: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'alternativa',
          },
          key: 'id'
        },
        allowNull: false
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Perguntaalternativa');
  }
};
