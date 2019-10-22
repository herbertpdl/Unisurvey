module.exports = (sequelize, DataType) => {
  const Course = sequelize.define(
    "Course",
    {
      name: DataType.STRING,
      period: DataType.INTEGER,
    },
    {
      freezeTableName: true
    }
    
  );

  return Course;
};