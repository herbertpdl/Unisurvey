module.exports = (sequelize, DataType) => {
  const Surveyquestion = sequelize.define(
    "Surveyquestion",
    {
      survey_id: DataType.INTEGER,
      question_id: DataType.INTEGER,
    },
    {
      freezeTableName: true
    }
  );

  Surveyquestion.removeAttribute('id')

  return Surveyquestion;
}