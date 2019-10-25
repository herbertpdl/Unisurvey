module.exports = (sequelize, DataType) => {
  const Course = sequelize.define(
    "Course",
    {
      name: DataType.STRING,
      period: DataType.INTEGER,
    },
    {
      freezeTableName: true
    }
  );

  Course.associate = function (models) {
    Course.belongsToMany(models.Matter, {through: 'Coursematter', as: 'Matter'});
  };

  return Course;
};