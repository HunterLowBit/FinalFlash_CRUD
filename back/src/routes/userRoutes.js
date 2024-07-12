const express = require("express");
const UserController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", UserController.register);
router.post("/authenticate", UserController.authenticate);

// Rotas para CRUD de usuários
router.get("/", UserController.listAllUsers);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

// Exemplo de uma rota protegida
router.get("/me", authMiddleware, async (req, res) => {
  // Acessar req.userId para buscar informações do usuário
  res.send({ ok: true, userId: req.userId });
});

module.exports = router;
