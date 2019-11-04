'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Surveyanswers',{
      survey_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Survey',
          },
          key: 'id'
        },
        allowNull: false
      },
      question_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Question',
          },
          key: 'id'
        },
        allowNull: false
      },
      answer: {
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
    return queryInterface.dropTable('Surveyanswers');
  }
};
