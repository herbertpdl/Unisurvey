const Sequelize = require("sequelize");

module.exports = (sequelize, DataType) => {
    const Questionalternative = sequelize.define(
      "Questionalternative",
      {
        id: { type: Sequelize.INTEGER, primaryKey: true },
        idquestion: DataType.INTEGER,
        idalternative: DataType.INTEGER
      },
      {
        tableName: "Questionalternative",
      },
    );

    Questionalternative.removeAttribute('id');

    return Questionalternative;
  };