const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/bc', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('MongoDB conectado Usuários');
});

const usersSchema = new mongoose.Schema({
  author_name: String,
  author_email: String,
  author_user: String,
  author_pwd: String,
  author_level: String,
  author_status: Boolean,
  author_create_date: { type: Date, default: Date.now }
});

const User = mongoose.model('User', usersSchema);

// Retornar todos os usuários
// GET "/users"
router.get('/', async (req, res) => {
  try {
    const foundedUser = await User.find();
    console.log('Objetos encontrados com sucesso!');
    res.status(200).json(foundedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Retornar um usuário específico
// GET /users/:pid
router.get('/:pid', async (req, res) => {
  const pid = req.params.pid;
  try {
    const foundedUser = await User.findById( pid );
    console.log('Objeto encontrado com sucesso!');
    res.json({ message: 'Usuário encontrado com sucesso!', foundedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// // Retornar um usuário específico
// // GET /users/:user
// router.get('/:user', async (req, res) => {
//   const nome = req.params.user;
//   try {
//     const docs = await User.find({ author_name: nome });
//     res.json(docs);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// Inserir um novo usuário
// POST "/users" BODY { ... }
router.post('/', async (req, res) => {
  const user = req.body.user;
  // console.log(user.user)
  try {
    const newUser = await User.create(user);
    console.log('Objeto salvo com sucesso!');
    res.json({ message: 'Usuário salvo com sucesso!', newUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Alterar um usuário
// PUT "/users/:id" BODY { ... }
router.put('/:pid', async (req, res) => {
  const pid = req.params.pid;
  const newUser = req.body.user;
  console.log(newUser);
  try {
    const updatedUser = await User.findByIdAndUpdate(pid, 
      { 
        author_name: newUser.author_name, 
        author_email: newUser.author_email,
        author_pwd: newUser.author_pwd,
        author_level: newUser.author_level,
        author_status: newUser.author_status,
      }, { new: true });
    console.log('Objeto Atualizado:', updatedUser);
    res.json({ message: 'Usuário alterado com sucesso!', updatedUser });
    //res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deletar um usuário
// DELETE "/users/:id"
router.delete('/:pid', async (req, res) => {
  const pid = req.params.pid;
  try {
    const deletedUser = await User.findByIdAndDelete(pid);
    console.log('Objeto deletado:', deletedUser);
    res.json({ message: 'Usuário deletado com sucesso!', deletedUser });
    //res.json(deletedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
