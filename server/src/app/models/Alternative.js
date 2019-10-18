const Sequelize = require("sequelize");

module.exports = (sequelize, DataType) => {
  const Alternative = sequelize.define(
    "Alternative",
    {
      id: { type: Sequelize.INTEGER, primaryKey: true },
      description: DataType.STRING,
    },
    {
      tableName: "Alternative",
    },
  );

  return Alternative;
};