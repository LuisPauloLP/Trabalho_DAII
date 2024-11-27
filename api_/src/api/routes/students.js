const express = require('express');
const router = express.Router();

//MONGODB
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/bc', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
  console.log('MongoDB conectado Estudantes');
});

const studentsSchema = new mongoose.Schema({
    student_name: String,
    student_surname: String,
    student_cpf: Number,
    student_email: String,
    student_date_of_born: { type: Date, required: true },
    student_phone: Number,
    student_cep: Number,
    student_logradouro: String,
    student_bairro: String,
    student_city: String,
    student_UF: String,
    student_user: String,
    student_status: Boolean,
    student_create_date: { type: Date, default: Date.now }
  });

const Student = mongoose.model('Student', studentsSchema); //MONGODB

// Retornar todos os estudantes
// GET "/students"
router.get('/', async (req, res) => {
  try {
    const foundedStudent = await Student.find();
    console.log('Objetos encontrados com sucesso!');
    res.status(200).json(foundedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Retornar um estudante específico
// GET /students/:pid
router.get('/:pid', async (req, res) => {
  const pid = req.params.pid;
  try {
    const foundedStudent = await Student.findById( pid );
    console.log('Objeto encontrado com sucesso!');
    res.json({ message: 'Estudante encontrado com sucesso!', foundedStudent });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Inserir um novo estudante
// POST "/students" BODY { ... }
router.post('/', async (req, res) => {
  const student = req.body.student;
  try {
    const newStudent = await Student.create(student);
    console.log('Objeto salvo com sucesso!');
    res.json({ message: 'Estudante salvo com sucesso!', newStudent });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Alterar um estudante
// PUT "/students/:id" BODY { ... }
router.put('/:pid', async (req, res) => {
  const pid = req.params.pid;
  const newStudent = req.body.student;
  console.log(newStudent);
  try {
    const updatedStudent = await Student.findByIdAndUpdate(pid, 
      { 
        student_name: newStudent.student_name, 
        student_surname: newStudent.student_surname,
        student_cpf: newStudent.student_cpf,
        student_email: newStudent.student_email,
        student_date_of_born: newStudent.student_date_of_born,
        student_phone: newStudent.student_phone,
        student_cep: newStudent.student_cep,
        student_logradouro: newStudent.student_logradouro,
        student_bairro: newStudent.student_bairro,
        student_city: newStudent.student_city,
        student_UF: newStudent.student_UF,
        student_status: newStudent.student_status,
      }, { new: true });
    console.log('Objeto Atualizado:', updatedStudent);
    res.json({ message: 'Estudante alterado com sucesso!', updatedStudent });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deletar um estudante
// DELETE "/students/:id"
router.delete('/:pid', async (req, res) => {
  const pid = req.params.pid;
  try {
    const deletedStudent = await Student.findByIdAndDelete(pid);
    console.log('Objeto deletado:', deletedStudent);
    res.json({ message: 'Estudante deletado com sucesso!', deletedStudent });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
