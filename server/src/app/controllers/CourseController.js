const { Course } = require("../models");

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

      console.log(req.body)

      let course = await Course.create({ ...req.body });

      return res.json(
      {
        name: course.name,
        perios: course.period,
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

    return res.json({ msg: "Success course deleted" });
  }
}

module.exports = new CourseController();
