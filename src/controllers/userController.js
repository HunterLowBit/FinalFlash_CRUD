const AuthService = require("../services/authService");

class UserController {
  async register(req, res) {
    try {
      const user = await AuthService.register(req.body);
      return res.status(201).send(user);
    } catch (error) {
      return res.status(400).send({ error: "Registro falhou" });
    }
  }

  async authenticate(req, res) {
    const { email, senha } = req.body;

    try {
      const { user, token } = await AuthService.authenticate(email, senha);
      res.send({ user, token });
    } catch (error) {
      return res.status(400).send({ error: "Falha na autenticação" });
    }
  }
}

module.exports = new UserController();
