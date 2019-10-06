'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Questionalternative', {
      idquestion: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'question',
          },
          key: 'id'
        },
        allowNull: false
      },
      idalternative: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'alternative',
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
    return queryInterface.dropTable('Questionalternative');
  }
};
