module.exports = (sequelize, DataType) => {
  const Matter = sequelize.define(
    "Matter",
    {
      //id: DataType.INTEGER,
      name: DataType.STRING,
      email: DataType.STRING,
      password: DataType.VIRTUAL,
      password_hash: DataType.STRING,
      course: DataType.INTEGER,
      cpf: DataType.STRING,
      type: DataType.STRING,
      //type: DataType.INTEGER,
      //status: DataType.INTEGER
    },
    {
      tableName: "Matter",
    },
  );

  User.prototype.checkHash = function(password) {
    return bcrypt.compare(password, this.password_hash);
  };

  User.prototype.createToken = function() {
    return jwt.sign({ id: this.id }, auth.secret, {
      expiresIn: auth.ttl
    });
  };

  return User;
};