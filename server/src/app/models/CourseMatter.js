module.exports = (sequelize, DataType) => {
  const Coursematter = sequelize.define(
    "Coursematter",
    {
      course_id: DataType.INTEGER,
      matter_id: DataType.INTEGER,
    },
    {
      freezeTableName: true
    }
  );

  Coursematter.removeAttribute('id');

  return Coursematter;
};