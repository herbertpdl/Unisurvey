'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Questionariopergunta', {
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
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Questionariopergunta');
  }
};
