const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");
const { promisify } = require("util");

const { User } = require("../models");

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({ error: "tokendadadada not exist" });
  }

  const [, token] = auth.split(" ");
  try {
    const decode = await promisify(jwt.verify)(token, authConfig.secret);
    req.user = await User.findOne({ where: { id: decode.id } });

    return next();

  } catch (err) {
    return res.status(401).json({ error: "token invalid" });
  }
};