const Sequelize = require("sequelize");

module.exports = (sequelize, DataType) => {
  const Alternative = sequelize.define(
    "Alternative",
    {
      description: DataType.STRING,
    },
    {
      freezeTableName: true
    }
  );

  return Alternative;
};