module.exports = (sequelize, DataType) => {
  const Matter = sequelize.define(
    "Matter",
    {
      name: DataType.STRING,
      teacher: DataType.INTEGER,
    },
    {
      tableName: "Matter",
    },
  );

  return Matter;
};