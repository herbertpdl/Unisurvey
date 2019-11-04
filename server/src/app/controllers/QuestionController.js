const { Question } = require("../models");
const { Questionalternative } = require("../models");
const { Alternative } = require("../models");

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
        allow_multiple: req.body.checkMultiple ? 1 : 0,
      }

      console.log(questionBody)

      let question;
      let alternatives;
      let questionAlternative = []

      question = await Question.create({ ...questionBody });

      console.log(question)

      if (req.body.type == 'multiple') {
        alternatives = await Alternative.bulkCreate(req.body.alternatives );

        alternatives.map(el => {
          questionAlternative.push({question_id: question.id, alternative_id: el.id})
        })

        Questionalternative.bulkCreate(questionAlternative)
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

    await Questionalternative.destroy({ where: { question_id: question.id } })

    if(questionBody.type === 'multiple') {
      req.body.alternatives.map(el => {
        Object.assign(el, {question_id: question.id})
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

    await Questionalternative.destroy({ where: { question_id: question.id} })
      .then(() => {
        question.destroy();
      })

    return res.json({ msg: "Success question deleted" });
  }
}

module.exports = new QuestionController();
