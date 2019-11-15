const Sequelize = require("sequelize");

const { Matter } = require("../models");
const { Coursematter } = require("../models");

class MatterController {
  async index(req, res) {
    const matter = req.matter;

    return res.json(matter);
  }

  async getAll(req, res) {
    var result = [];
    
      result = await Matter.findAll();

    return res.json(result);
  }

  async store(req, res) {
    try {

      let matter = await Matter.create({ ...req.body });

      return res.json(
      {
        name: matter.name,
        teacherId: matter.teacher_id,
        teacherName: matter.teacher_name,
      });
    } catch (error) {
      return res.status(500).json({error: error})
    }
  }

  async update(req, res) {
    const matter = req.matter;

    const param = {
      name: req.body.name,
      code: req.body.code,
      teacher_id: req.body.teacher_id,
      teacher_name: req.body.teacher_name,
    };


    matter.update(param);

    return res.json({
      matter
    });
  }

  async delete(req, res) {
    const Op = Sequelize.Op
    const matter = req.matter;

    Coursematter.destroy({where: {matter_id: matter.id} })

    matter.destroy();

    return res.json({ msg: "Success matter deleted" });
  }
}

module.exports = new MatterController();
