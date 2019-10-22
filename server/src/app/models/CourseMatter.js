module.exports = (sequelize, DataType) => {
  const Coursematter = sequelize.define(
    "Coursematter",
    {
      idcourse: DataType.INTEGER,
      iddiscipline: DataType.INTEGER,
    },
    {
      freezeTableName: true
    }
  );

  Coursematter.removeAttribute('id');

  return Coursematter;
};