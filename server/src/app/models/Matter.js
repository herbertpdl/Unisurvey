module.exports = (sequelize, DataType) => {
  const Matter = sequelize.define(
    "Matter",
    {
      name: DataType.STRING,
      teacher_id: DataType.INTEGER,
      teacher_name: DataType.STRING,
    },
    {
      tableName: "Matter",
    },
  );

  return Matter;
};