const Sequelize = require("sequelize");

const { Survey } = require("../models");
const { Surveyquestion } = require("../models");
const { Surveyanswers } = require("../models");
const { Surveyanswered } = require("../models");
const { User } = require("../models");

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

      let teachers = []
      let teachersSurveys = []
      let survey
      const questions = [];

      if (req.body.type === '1') {
        console.log('caiu no if')
        teachers = await User.findAll({ attributes: ['name', 'id'], where: { type: 'professor' } });

        teachers.map((el, index) => {
          teachersSurveys[index] = {
            name: `${req.body.name} - professor ${el.name}`,
            type: req.body.type,
            teacher_id: el.id,
          };
        })

        survey = await Survey.bulkCreate(teachersSurveys)

        survey.map(el => {
          req.body.questions.map(question => {
            questions.push({
              survey_id: el.dataValues.id,
              question_id: question.id
            })
          })
        })

        console.log('depois do map')

        Surveyquestion.bulkCreate(questions)
      } else {
        survey = await Survey.create({ ...surveyBody })

        req.body.questions.map((el, index) => {
          questions[index] = {
            survey_id: survey.id,
            question_id: el.id,
          }
        })

        Surveyquestion.bulkCreate(questions);
      }

      return res.json(
        {
          success: true,
        }
      );

    } catch (error) {
      return res.status(500).json({error: error})
    }
  }

  async getByType(req, res) {
    let surveys = undefined

    if (req.params.id_user) {
      // answered answers from database
      let temp = await Surveyanswered.findAll({ where: { user_id: req.params.id_user } })
  
      //filtered response
      let answered = []
      
      temp.map(el => {
        answered.push(el.dataValues.survey_id)
      })

      surveys = await Survey.findAll({ where: { type: req.params.type, id: { [Op.notIn]: answered } }, include:
        [{ all: true, nested: true }]});
    } else {
      surveys = await Survey.findAll({ where: { type: req.params.type }, include:
        [{ all: true, nested: true }]});
    }


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

      //Saves that the user already answered the survey
      Surveyanswered.create({
        survey_id: req.body.survey_id,
        user_id: req.body.user_id,
      })

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
      where: { survey_id: req.params.idsurvey, question_id: req.params.idquestion,  }
    })
    
    if (answers) {
      return res.json(answers)
    }

    return res.status(400).json({ error: "No answers finded" });
  }

  
  async getSurveysByCourse(req, res) {
    const Op = Sequelize.Op

    const course = req.course;

    const teachers = []
    
    course.Matter.map(el => {
      teachers.push(el.dataValues.teacher_id)
    })

    // answered answers from database
    let temp = await Surveyanswered.findAll({ where: { user_id: req.params.id_user } })

    //filtered response
    let answered = []
    
    temp.map(el => {
      answered.push(el.dataValues.survey_id)
    })

    const surveyList = await Survey.findAll({ where: { teacher_id: { [Op.in]: teachers }, id: { [Op.notIn]: answered } }, include:
    [{ all: true, nested: true }]})

    return res.json(surveyList)
  }

}

module.exports = new SurveyController();
