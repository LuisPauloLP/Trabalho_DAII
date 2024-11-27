const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/bc', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('MongoDB conectado Profissionais');
});

const professionalsSchema = new mongoose.Schema({
  professional_name: String,
  professional_email: String,
  professional_speciality: String,
  professional_pwd: String,
  professional_level: String,
  professional_phone_number: Number,
  professional_status: Boolean,
  professional_create_date: { type: Date, default: Date.now }
});

const Professional = mongoose.model('Professional', professionalsSchema);

//GET todos os profissionais
router.get('/', async (req, res) => {
    try {
      const foundedProfessional = await Professional.find();
      console.log('Profissionais encontrados com sucesso!');
      res.status(200).json(foundedProfessional);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

// GET profissionais especifico por id
router.get('/:pid', async (req, res) => {
    const pid = req.params.pid;
    try {
      const foundedProfessional = await Professional.findById( pid );
      console.log('Profissional encontrado com sucesso!');
      res.json({ message: 'Profissional encontrado com sucesso!', foundedProfessional });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

// // GET profissional especifico por nome
// router.get('/professionals', async (req, res) => {
//     const nome = req.params.professional;
//     try {
//      const docs = await Professional.find({ professional_name: nome });
//      res.json(docs);
//    } catch (err) {
//      res.status(500).json({ error: err.message });
//    }
//  });

// POST cadastro de profissionais
router.post('/', async (req, res) => {
    const professional = req.body.professional;
    try {
      const newProfessional = await Professional.create(professional);
      console.log('Profissional salvo com sucesso!');
      res.json({ message: 'Profissional salvo com sucesso!', newProfessional });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

// UPDATE do registro nas funções
router.put('/:pid', async (req, res) => {
    const pid = req.params.pid;
    const newProfessional = req.body.professional;
    console.log(newProfessional);
    try {
      const updatedProfessional = await Professional.findByIdAndUpdate(pid, 
        { 
            professional_name: newProfessional.professional_name, 
            professional_email: newProfessional.professional_email,
            professional_speciality: newProfessional.professional_speciality,
            professional_pwd: newProfessional.professional_pwd,
            professional_level: newProfessional.professional_level,
            professional_status: newProfessional.professional_status,
            professional_phone_number: newProfessional.professional_phone_number,
        }, { new: true });
      console.log('Objeto Atualizado:', updatedProfessional);
      res.json({ message: 'Usuário alterado com sucesso!', updatedProfessional });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});


// DELETE cadastro de profissionais
router.delete('/:pid', async (req, res) => {
    const pid = req.params.pid;
    try {
      const deletedProfessional = await Professional.findByIdAndDelete(pid);
      console.log('Profissional deletado:', deletedProfessional);
      res.json({ message: 'Usuário deletado com sucesso!', deletedProfessional });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

module.exports = router;