const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../../controllers/authController');

router.post('/register', registerUser); // Rota para registro
router.post('/login', loginUser);       // Rota para login

module.exports = router;
