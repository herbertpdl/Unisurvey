module.exports = (sequelize, DataType) => {
  const Course = sequelize.define(
    "Curso",
    {
      idcourse: DataType.INTEGER,
      iddiscipline: DataType.INTEGER,
    },
    {
      freezeTableName: true
    }
    
  );

  return Course;
};