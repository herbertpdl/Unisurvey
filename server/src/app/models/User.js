// libs
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../../config/auth");
const Sequelize = require("sequelize");

module.exports = (sequelize, DataType) => {
  const User = sequelize.define(
    "User",
    {
      id: { type: Sequelize.INTEGER, primaryKey: true },
      name: DataType.STRING,
      email: DataType.STRING,
      password: DataType.VIRTUAL,
      password_hash: DataType.STRING,
      course: DataType.INTEGER,
      cpf: DataType.STRING,
      type: DataType.STRING,
    },
    {
      tableName: "User",
      hooks: {
        beforeSave: async user => {
          if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8);
          }
        }
      }
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