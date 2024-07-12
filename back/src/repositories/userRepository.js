const User = require('../models/User');

class UserRepository {
  async create(userData) {
    const user = await User.create(userData);
    return user;
  }

  // Adicione mais métodos conforme necessário
}

module.exports = new UserRepository();