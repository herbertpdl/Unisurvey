const Sequelize = require("sequelize");

module.exports = (sequelize, DataType) => {
    const Questionalternative = sequelize.define(
      "Questionalternative",
      {        
        idquestion: DataType.INTEGER,
        description: DataType.STRING
      },
      {
        tableName: "Questionalternative",
      },
    );

    Questionalternative.removeAttribute('id');

    return Questionalternative;
  };