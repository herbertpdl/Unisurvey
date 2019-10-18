const Sequelize = require("sequelize");

module.exports = (sequelize, DataType) => {
  const Matter = sequelize.define(
    "Matter",
    {
      id: { type: Sequelize.INTEGER, primaryKey: true },
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