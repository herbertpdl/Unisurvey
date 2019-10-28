const Sequelize = require("sequelize");

module.exports = (sequelize, DataType) => {
  const Question = sequelize.define(
    "Question",
    {      
      statement: DataType.STRING,
      type: DataType.STRING,
      allowMultiple: DataType.BOOLEAN,
    },
    {
      tableName: "Question",
    },
  );

  Question.associate = function (models) {
    Question.belongsToMany(models.Survey, {through: 'Surveyquestion', as: 'survey'})
  }

  return Question;
};