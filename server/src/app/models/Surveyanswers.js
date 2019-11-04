const Sequelize = require("sequelize");

module.exports = (sequelize, DataType) => {
    const Surveyanswers = sequelize.define(
      "Surveyanswers",
      {        
        survey_id: DataType.INTEGER,
        question_id: DataType.INTEGER,
        answer: DataType.STRING,
      },
      {
        freezeTableName: true
      }
    );

    Surveyanswers.removeAttribute('id');

    return Surveyanswers;
  };