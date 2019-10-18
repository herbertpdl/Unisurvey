'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Questionalternative', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER
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
      idalternative: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Alternative',
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
