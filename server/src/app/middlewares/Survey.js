const { Survey } = require("../models")

module.exports = async(req, res, next) => {
  const survey = await Survey.findOne({ where: { id: req.params.id}, include:
    ['questions']});
  if(survey) {
    req.survey = survey;

    return next();
  }

  return res.status(400).json({ error: "Invalid survey id" });
}