const Sequelize = require("sequelize");

module.exports = (sequelize, DataType) => {
  const Question = sequelize.define(
    "Question",
    {
      id: { type: Sequelize.INTEGER, primaryKey: true },
      statement: DataType.STRING,
      type: DataType.STRING,
      allowMultiple: DataType.BOOLEAN,
    },
    {
      tableName: "Question",
    },
  );

  return Question;
};