const { User } = require("../models");

class UserController {
  async index(req, res) {
    const user = req.user;

    return res.json({ id: user.id, email: user.email, name: user.name });
  }

  async store(req, res) {
    try {
      var user = await User.create({ ...req.body });

      return res.json({ id: user.id, email: user.email, name: user.name });
    } catch (error) {
      return res.status(500).json({error: "Server Fail"})
    }
  }

  async update(req, res) {
    const user = req.user;

    const param = {
      name: req.body.name,
      type: req.body.type,
      status: req.body.status
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
