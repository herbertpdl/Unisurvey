module.exports = (sequelize, DataType) => {
  const Survey = sequelize.define(
    "Survey",
    {
      name: DataType.STRING,
      type: DataType.INTEGER,
      teacher_id: DataType.INTEGER,
    },
    {
      freezeTableName: true
    }
  )

  Survey.associate = function(models) {
    Survey.belongsToMany(models.Question, {through: 'Surveyquestion', as: 'questions'})
  }

  return Survey;
}