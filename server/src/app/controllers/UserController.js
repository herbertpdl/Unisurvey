const { User } = require("../models");

class UserController {
  async index(req, res) {
    const user = req.usuario;

    return res.json({ id: user.id, email: user.email, name: user.name });
  }

  async store(req, res) {
    try {
      var user = await User.create({ ...req.body });

      return res.json(
        {
        name: user.name,
        email: user.email, 
        password: user.password,
        course: user.course,
        cpf: user.cpf,
        tipo: user.tipo,
      });
    } catch (error) {
      return res.status(500).json({error: "Server Fail"})
    }
  }

  async update(req, res) {
    const user = req.user;

    const param = {
      nome: req.body.nome,
      email: req.body.email,
      password: req.body.password,
      curso: req.body.curso,
      cpf: req.body.cpf,
      tipo: req.body.tipo,
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
