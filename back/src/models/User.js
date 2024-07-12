const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  senha: {
    type: String,
    required: true,
    select: false,
  },
  cpf: {
    type: String,
    required: true,
    unique: true,
  },
});

userSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.senha, 10);
  this.senha = hash;

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
// back\src\models\User.js