const { Survey } = require("../models");
const { Surveyquestion } = require("../models");
const { Surveyanswers } = require("../models");

class SurveyController {
  async index(req, res) {
    const survey = req.survey;

    return res.json(survey)
  }

  async store(req, res) {
    try {
      const surveyBody = {
        name: req.body.name,
        type: req.body.type,
      }

      const survey = await Survey.create({ ...surveyBody });

      const questions = [];

      req.body.questions.map((el, index) => {
        questions[index] = {
          survey_id: survey.id,
          question_id: el.id,
        }
      })

      Surveyquestion.bulkCreate(questions);

      return res.json(
        {
          name: survey.name,
          type: survey.type,
        }
      );

    } catch (error) {
      return res.status(500).json({error: error})
    }
  }

  async getByType(req, res) {
    const surveys = await Survey.findAll({ where: { type: req.params.type}, include:
      [{ all: true, nested: true }]});

    if(surveys) {
      req.surveys = surveys
      return res.json(surveys);
    }

    return res.status(400).json({ error: "No survey"})
  }

  async saveAnswers(req, res) {
    try {
      let answers = req.body.answers

      let surveyanswers = [];

      answers.map(el => {
        if(typeof el.answer === 'string') {
          surveyanswers.push({
            survey_id: req.body.survey_id,
            question_id: el.question_id,
            answer: el.answer,
          })
        } else {
          surveyanswers.push({
            survey_id: req.body.survey_id,
            question_id: el.question_id,
            answer: JSON.stringify(el.answer),
          })
        }
      })

      Surveyanswers.bulkCreate(surveyanswers)

      return res.json(
        {
          id: req.body.survey_id
        }
      )

    }
    catch(error) {
      return res.status(500).json({error: error})
    }
  }

  async getAnswerBySurveyQuestion(req, res) {
    const answers = await Surveyanswers.findAll({
      attributes: ['answer'],
      where: { survey_id: req.params.idsurvey, question_id: req.params.idquestion }
    })
    
    if (answers) {
      return res.json(answers)
    }

    return res.status(400).json({ error: "No answers finded" });
  }

}

module.exports = new SurveyController();
