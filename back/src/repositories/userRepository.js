const User = require("../models/User");

class UserRepository {
  async create(userData) {
    const user = await User.create(userData);
    return user;
  }

  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  async findById(id) {
    const user = await User.findById(id);
    return user;
  }

  async update(id, userData) {
    const user = await User.findByIdAndUpdate(id, userData, { new: true });
    return user;
  }

  async delete(id) {
    const user = await User.findByIdAndDelete(id);
    return user;
  }

  async findAll() {
    const users = await User.find();
    return users;
  }

  async findByCpf(cpf) {
    const user = await User.findOne({ cpf });
    return user;
  }

  async findByEmailAndPassword(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(password, user.senha);
    if (!isPasswordValid) {
      return null;
    }
    return user;
  }
}

module.exports = new UserRepository();
// back\src\repositories\userRepository.js