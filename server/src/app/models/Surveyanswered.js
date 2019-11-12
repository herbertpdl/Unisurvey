module.exports = (sequelize, DataType) => {
  const Surveyanswered = sequelize.define(
    "Surveyanswered",
    {
      survey_id: DataType.INTEGER,
      user_id: DataType.INTEGER,
    },
    {
      freezeTableName: true
    }
  )

  Surveyanswered.removeAttribute('id');

  return Surveyanswered;
}