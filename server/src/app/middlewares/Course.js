const { Course } = require("../models");

module.exports = async (req, res, next) => {
  const course = await Course.findOne({ where: { id: req.params.id } });
  if (course) {
    req.course = course;

    return next();
  }

  return res.status(400).json({ error: "Invalid course id" });
};
