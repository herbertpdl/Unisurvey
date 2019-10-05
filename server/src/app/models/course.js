module.exports = (sequelize, DataType) => {
    const Course = sequelize.define(
      "Curso",
      {
        nome: DataType.STRING,
        periodo: DataType.INTEGER,
      },
      {freezeTableName: true}
      );

      Course.create({nome: 'Ciencia', periodo: 1})
      Course.create({nome: 'SEFODE', periodo: 23})

    return Course;

}