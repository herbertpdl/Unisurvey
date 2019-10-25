const { Course } = require("../models");
const { Coursematter } = require("../models");

class CourseController {
  async index(req, res) {
    const course = req.course;
    // TODO GET MATTERS FROM COURSE
    
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

    const param = {
      name: req.body.name,
      teacher_id: req.body.teacher_id,
      teacher_name: req.body.teacher_name,
    };


    course.update(param);

    return res.json({
      course
    });
  }

  async delete(req, res) {
    const course = req.course;

    course.destroy();

    await Coursematter.destroy ({where: {idcourse: course.id} })
      .then (() => {
        course.destroy();
      })
      
    return res.json({ msg: "Success course deleted" });
  }
}

module.exports = new CourseController();
