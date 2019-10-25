'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Coursematter', {
      course_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Course',
          },
          key: 'id'
        },
        allowNull: false
      },
      matter_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Matter',
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
    return queryInterface.dropTable('Coursematter');
  }
};
