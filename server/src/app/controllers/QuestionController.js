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
    let alternatives;
    let tempQuestionAlternatives = [];
    let tempAlternatives = req.body.alternatives.map(el => {
      return { description: el.description }
    })

    const questionBody = {
      statement: req.body.statement,
      type: req.body.type,
      allow_multiple: req.body.allow_multiple
    };

    await Questionalternative.destroy({ where: { question_id: question.id } })

    if(questionBody.type === 'multiple') {
      console.log('bem antes')

      console.log(req.body.alternatives)

      alternatives = await Alternative.bulkCreate(tempAlternatives);

      console.log('antes')

      alternatives.map(el => {
        tempQuestionAlternatives.push({question_id: question.id, alternative_id: el.id})
      })

      console.log('depois')

      await Questionalternative.bulkCreate(tempQuestionAlternatives);

      console.log('mais depois ainda')
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
