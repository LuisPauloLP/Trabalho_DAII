const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/bc', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('MongoDB conectado');
});

const teacherSchema = new mongoose.Schema({
  name: String,
  school_disciplines: String,
  contact: String,
  phone_number: String,
  teacher_status: Boolean,
  created_at: { type: Date, default: Date.now }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    console.log('Professores encontrados com sucesso!');
    res.status(200).json(teachers);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).json({ message: 'Professor não encontrado' });
    }
    console.log('Professor encontrado:', teacher);
    res.json(teacher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/search/:name', async (req, res) => {
  const name = req.params.name;
  try {
    const teachers = await Teacher.find({ name: { $regex: name, $options: 'i' } }); 
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const teacher = req.body;
  try {
    const newTeacher = await Teacher.create(teacher);
    console.log('Professor salvo com sucesso:', newTeacher);
    res.status(201).json({ message: 'Professor salvo com sucesso!', newTeacher });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const updatedTeacherData = req.body;
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      id,
      {
        name: updatedTeacherData.name,
        school_disciplines: updatedTeacherData.school_disciplines,
        contact: updatedTeacherData.contact,
        phone_number: updatedTeacherData.phone_number,
        status: updatedTeacherData.status,
      },
      { new: true }
    );
    if (!updatedTeacher) {
      return res.status(404).json({ message: 'Professor não encontrado' });
    }
    console.log('Professor atualizado com sucesso:', updatedTeacher);
    res.json({ message: 'Professor atualizado com sucesso!', updatedTeacher });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(id);
    if (!deletedTeacher) {
      return res.status(404).json({ message: 'Professor não encontrado' });
    }
    console.log('Professor deletado:', deletedTeacher);
    res.json({ message: 'Professor deletado com sucesso!', deletedTeacher });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
