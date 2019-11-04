const { Question } = require("../models");

module.exports = async (req, res, next) => {
  const question = await Question.findOne({ where: { id: req.params.id }, include:
  ['alternatives']});
  if (question) {
    req.question = question;

    return next();
  }

  return res.status(400).json({ error: "Invalid question id" });
};