const { Matter } = require("../models");

module.exports = async (req, res, next) => {
  const matter = await Matter.findOne({ where: { id: req.params.id } });
  if (matter) {
    req.matter = matter;

    return next();
  }

  return res.status(400).json({ error: "Invalid matter id" });
};