'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Surveyanswered', {
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
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'User',
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
    return queryInterface.dropTable('Surveyanswered');
  }
};
