const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/userRepository');
require('dotenv').config();

class AuthService {
  async register(userData) {
    // Verifique se o usuário já existe e, em seguida, crie um novo usuário
    const user = await UserRepository.create(userData);
    user.senha = undefined; // Não retorne a senha
    return user;
  }

  async authenticate(email, senha) {
    const user = await User.findOne({ email }).select('+senha');

    if (!user || !(await bcrypt.compare(senha, user.senha))) {
      throw new Error('Email ou senha inválidos');
    }

    user.senha = undefined;
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: 86400, // expira em 24 horas
    });

    return { user, token };
  }

  // Método para gerar token (opcionalmente, pode ser movido para uma função utilitária separada)
}

module.exports = new AuthService();