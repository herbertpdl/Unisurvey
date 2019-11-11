const { User } = require("../models");

class AuthController {
  async store(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Invalid request" });
    }

    // search user
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // check password
    if (!(await user.checkHash(password))) {
      return res.status(400).json({ error: "Password invalid" });
    }

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
        course: user.course
      },
      token: user.createToken()
    });
  }
}

module.exports = new AuthController();