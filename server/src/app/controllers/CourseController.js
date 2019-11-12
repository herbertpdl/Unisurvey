const { Course } = require("../models");
const { Coursematter } = require("../models");

class CourseController {
  async index(req, res) {
    const course = req.course;
    
    return res.json(course);
  }

  async getAll(req, res) {
    var result = [];
    
      result = await Course.findAll();

    return res.json(result);
  }

  async store(req, res) {
    try {

      const courseBody = {
        name: req.body.name,
        period: req.body.period,
      }

      const course = await Course.create({ ...courseBody });

      const matters = [];
      
      req.body.matters.map((el, index) => {
        matters[index] = {
          course_id: course.id,
          matter_id: el.id,
        }
      })

      Coursematter.bulkCreate(matters);

      return res.json(
      {
        name: course.name,
        period: course.period,
      });
    } catch (error) {
      return res.status(500).json({error: error})
    }
  }

  async update(req, res) {
    const course = req.course;

    const courseBody = {
      name: req.body.name,
      period: req.body.period,
      Matter: req.body.matters
    }

    await Coursematter.destroy ({where: {course_id: course.id} })

    const matters = [];
    
    req.body.matters.map((el, index) => {
      matters[index] = {
        course_id: course.id,
        matter_id: el.id,
      }
    })

    Coursematter.bulkCreate(matters);

    course.update(courseBody);

    return res.json({
      course
    });
  }

  async delete(req, res) {
    const course = req.course;

    course.destroy();

    await Coursematter.destroy ({where: {course_id: course.id} })
      .then (() => {
        course.destroy();
      })
      
    return res.json({ msg: "Success course deleted" });
  }
}

module.exports = new CourseController();
