'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Quizquestion', {
      idquiz: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Quiz',
          },
          key: 'id'
        },
        allowNull: false
      },
      idquestion: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Question',
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
    return queryInterface.dropTable('Quizquestion');
  }
};
