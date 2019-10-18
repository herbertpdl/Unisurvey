const { Question } = require("../models");
const { Alternative } = require("../models");
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
      let alternatives;
      let questionalternatives = false;

      console.log(questionBody);
      if (req.body.type == 'discursive') {
        question = await Question.create({ ...questionBody });
        console.log(question);
      } else {
        question = await Question.create({ ...questionBody });
        alternatives = await Alternative.bulkCreate( req.body.alternatives );
      }

      //Merge IdQuestions e IdAlternative in the table Questionalternative
      if (alternatives) {
        alternatives.map(val=> {
          questionalternatives = Questionalternative.create({idquestion: question.id, idalternative: val.id});
        })
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
    const user = req.user;

    const param = {
      name: req.body.name,
      email: req.body.email,
      password_hash: req.body.password,
      course: req.body.course,
      cpf: req.body.cpf,
      type: req.body.type,
    };

    if (req.body.password) param.password_hash = req.body.password;

    user.update(param);

    return res.json({
      user
    });
  }

  async delete(req, res) {
    const question = req.question;

    question.destroy();

    return res.json({ msg: "Success question deleted" });
  }
}

module.exports = new QuestionController();
