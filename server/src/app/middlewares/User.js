const { User } = require("../models");

module.exports = async (req, res, next) => {
  const user = await User.findOne({ where: { id: req.params.id } });
  if (user) {
    req.user = user;

    return next();
  }

  return res.status(400).json({ error: "Invalid user id" });
};