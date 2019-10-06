'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Quizanswered', {
      idquiz: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'quiz',
          },
          key: 'id'
        },
        allowNull: false
      },
      iduser: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'user',
          },
          key: 'id'
        },
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Quizanswered');
  }
};
