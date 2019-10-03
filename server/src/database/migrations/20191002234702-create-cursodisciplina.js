'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CursoDisciplina', {
      idCurso: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'curso',
          },
          key: 'id'
        },
        allowNull: false
      },
      idDisciplina: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'disciplina',
          },
          key: 'id'
        },
        allowNull: false
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Cursodisciplina');
  }
};
