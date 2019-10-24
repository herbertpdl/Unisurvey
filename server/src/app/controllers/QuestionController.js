const { Question } = require("../models");
const { Questionalternative } = require("../models");

class QuestionController {
  async index(req, res) {
    const question = req.question;

    return res.json(question);
  }

  async getAll(req, res) {
    var result = [];

      result = await Question.findAll();

    return res.json(result);
  }

  async store(req, res) {
    try {
      let questionBody = {
        statement: req.body.statement,
        type: req.body.type,
        checkMultiple: req.body.checkMultiple
      }

      let question;

      question = await Question.create({ ...questionBody });

      if (req.body.type == 'multiple') {
        req.body.alternatives.map(el => {
          Object.assign(el, {idquestion: question.id})
        })

        await Questionalternative.bulkCreate(req.body.alternatives );
      }

      return res.json(
      {
        statement: question.statement,
        type: question.type,
        checkMultiple: question.checkMultiple,
      });
    } catch (error) {
      return res.status(500).json({error: error})
    }
  }

  async update(req, res) {
    const question = req.question;

    const questionBody = {
      statement: req.body.statement,
      type: req.body.type,
      checkMultiple: req.body.checkMultiple
    };

    await Questionalternative.destroy({ where: { idquestion: question.id } })

    if(questionBody.type === 'multiple') {
      req.body.alternatives.map(el => {
        Object.assign(el, {idquestion: question.id})
      })
      await Questionalternative.bulkCreate(req.body.alternatives );
    }

    question.update(questionBody);

    return res.json({
      question
    });
  }

  async delete(req, res) {
    const question = req.question;

    await Questionalternative.destroy({ where: { idquestion: question.id} })
      .then(() => {
        question.destroy();
      })

    return res.json({ msg: "Success question deleted" });
  }
}

module.exports = new QuestionController();
