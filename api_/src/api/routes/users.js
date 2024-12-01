// module.exports = router;
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');



const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
  const { author_user, author_pwd } = req.body;

  try {

    // Log para identificar as credenciais recebidas
    console.log('Tentativa de login com:', { author_user, author_pwd });

    // Verificar se o usuário existe no banco
    const user = await User.findOne({ author_user });
    if (!user) {
      console.log('Usuário não encontrado:', author_user);
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    // Comparar senha digitada com a senha criptografada no banco
    console.log('Senha no banco:', user.author_pwd); // Mostra a senha criptografada no banco
    const isPasswordValid = await bcrypt.compare(author_pwd, user.author_pwd);
    console.log('Senha válida?', isPasswordValid); // Mostra se a senha é válida

    if (!isPasswordValid) {
      console.log('Senha inválida para o usuário:', author_user);
      return res.status(401).json({ message: 'Credenciais inválidas!' });
    }

    console.log('Login realizado com sucesso!');
    res.json({
      message: 'Login realizado com sucesso!',
      user: { id: user._id, author_user: user.author_user },
    });
  } catch (err) {
    console.error('Erro ao processar login:', err.message);
    res.status(400).json({ message: err.message });
  }
});

// Conectar ao MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/bc', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('MongoDB conectado Usuários');
});

// Definir o esquema
const usersSchema = new mongoose.Schema({
  author_name: String,
  author_email: String,
  author_user: String,
  author_pwd: String,
  author_level: String,
  author_status: Boolean,
  author_create_date: { type: Date, default: Date.now }
});

// Garantir que o modelo seja criado apenas uma vez
const User = mongoose.models.User || mongoose.model('User', usersSchema);

// Rotas para usuários
router.get('/', async (req, res) => {
  try {
    const foundedUser = await User.find();
    console.log('Objetos encontrados com sucesso!');
    res.status(200).json(foundedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/:pid', async (req, res) => {
  const pid = req.params.pid;
  try {
    const foundedUser = await User.findById(pid);
    console.log('Objeto encontrado com sucesso!');
    res.json({ message: 'Usuário encontrado com sucesso!', foundedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// router.post('/', async (req, res) => {
//   const user = req.body.user;
//   try {
//     const newUser = await User.create(user);
//     console.log('Objeto salvo com sucesso!');
//     res.json({ message: 'Usuário salvo com sucesso!', newUser });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

router.post('/', async (req, res) => {
  const { author_name, author_email, author_user, author_pwd, author_level, author_status } = req.body;

  try {

    // Adicione logs para depurar
    console.log('Tentativa de salvar usuário com:', { author_name, author_email, author_user, author_pwd });

    // Criptografar a senha antes de salvar
    const hashedPassword = await bcrypt.hash(author_pwd, 10);
    console.log('Senha original:', author_pwd); // Mostra a senha recebida (não inclua em produção)
    console.log('Senha criptografada:', hashedPassword); // Mostra a versão criptografada

    const newUser = new User({
      author_name,
      author_email,
      author_user,
      author_pwd: hashedPassword, // Salva a senha criptografada
      author_level,
      author_status,
    });

    await newUser.save();
    console.log('Usuário salvo com sucesso!', newUser);
    res.status(201).json({ message: 'Usuário salvo com sucesso!', newUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:pid', async (req, res) => {
  const pid = req.params.pid;
  const newUser = req.body.user;
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
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:pid', async (req, res) => {
  const pid = req.params.pid;
  try {
    const deletedUser = await User.findByIdAndDelete(pid);
    console.log('Objeto deletado:', deletedUser);
    res.json({ message: 'Usuário deletado com sucesso!', deletedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
