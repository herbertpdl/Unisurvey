'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Coursediscipline', {
      idcourse: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'course',
          },
          key: 'id'
        },
        allowNull: false
      },
      iddiscipline: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'discipline',
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
    return queryInterface.dropTable('Coursediscipline');
  }
};
