const { Survey } = require("../models");
const { Surveyquestion } = require("../models");
const { Questionalternative } = require("../models");

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

}

module.exports = new SurveyController();
