module.exports = (sequelize, DataType) => {
  const Course = sequelize.define(
    "Curso",
    {
      nome: DataType.STRING,
      periodo: DataType.INTEGER,
    },
    {
      freezeTableName: true
    }
    
  );

  return Course;
};