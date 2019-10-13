const { User } = require("../models");

class UserController {
  async index(req, res) {
    const user = req.user;

    return res.json({ id: user.id, name: user.name, email: user.email, type: user.type });
  }

  async store(req, res) {
    try {
      var user = await User.create({ ...req.body });

      return res.json(
        {
        name: user.name,
        email: user.email, 
        password: user.password,
        cpf: user.cpf,
        type: user.type,
      });
    } catch (error) {
      return res.status(500).json({error: "Server Fail"})
    }
  }

  async update(req, res) {
    const user = req.user;

    const param = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      course: req.body.course,
      cpf: req.body.cpf,
      type: req.body.type,
    };

    if (req.body.password) param.password = req.body.password;

    user.update(param);

    return res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      type: user.type,
      status: user.status
    });
  }

  async delete(req, res) {
    const user = req.user;

    user.destroy();

    return res.json({ msg: "Success user deleted" });
  }
}

module.exports = new UserController();
