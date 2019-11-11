const Sequelize = require("sequelize");

module.exports = (sequelize, DataType) => {
  const Matter = sequelize.define(
    "Matter",
    {
      id: { type: Sequelize.INTEGER, primaryKey: true },
      name: DataType.STRING,
      code: DataType.INTEGER,
      teacher_id: DataType.INTEGER,
      teacher_name: DataType.STRING,
    },
    {
      tableName: "Matter",
    },
  );

  Matter.associate = function (models) {
    Matter.belongsToMany(models.Course, {through: 'Coursematter', as: 'Course'});
  };

  return Matter;
};