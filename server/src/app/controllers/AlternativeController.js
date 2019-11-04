const { Questionalternative } = require("../models");

class QuestionController {
  async index(req, res) {
    const question = req.question;

    return res.json(question);
  }

  async getByQuestion(req, res) {
    const questionAlternatives = await Questionalternative.findAll({ where: { question_id: req.params.idquestion } })

    return res.json(questionAlternatives)
  }
}

module.exports = new QuestionController();
