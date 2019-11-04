const Sequelize = require("sequelize");

module.exports = (sequelize, DataType) => {
  const Question = sequelize.define(
    "Question",
    {      
      statement: DataType.STRING,
      type: DataType.STRING,
      allow_multiple: DataType.BOOLEAN,
    },
    {
      freezeTableName: true
    }
  );

  Question.associate = function (models) {
    Question.belongsToMany(models.Survey, {through: 'Surveyquestion', as: 'survey'})
  }

  Question.associate = function (models) {
    Question.belongsToMany(models.Alternative, {through: 'Questionalternative', as: 'alternatives'})
  }

  return Question;
};