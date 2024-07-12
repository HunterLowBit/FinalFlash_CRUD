const AuthService = require("../services/authService");
const UserRepository = require("../repositories/userRepository");

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

  async listAllUsers(req, res) {
    try {
      const users = await UserRepository.findAll();
      res.send(users);
    } catch (error) {
      res.status(500).send({ error: "Erro ao listar usuários" });
    }
  }

  async updateUser(req, res) {
    try {
      const user = await UserRepository.update(req.params.id, req.body);
      res.send(user);
    } catch (error) {
      res.status(400).send({ error: "Erro ao atualizar usuário" });
    }
  }

  async deleteUser(req, res) {
    try {
      await UserRepository.delete(req.params.id);
      res.send({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      res.status(400).send({ error: "Erro ao deletar usuário" });
    }
  }
}

module.exports = new UserController();
