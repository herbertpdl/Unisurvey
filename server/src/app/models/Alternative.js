module.exports = (sequelize, DataType) => {
  const Alternative = sequelize.define(
    "Alternative",
    {
      description: DataType.STRING,
    },
    {
      tableName: "Alternative",
    },
  );

  return Alternative;
};