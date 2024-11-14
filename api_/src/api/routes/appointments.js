const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/bc', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log('MongoDB conectado');
});

const appointmentsSchema = new mongoose.Schema({
    appointment_speciality: String,
    appointment_comments: String,
    appointment_date: Date,
    appointment_professional: String,
    appointment_student: String,
    appointment_create_date: { type: Date, default: Date.now }
});
  
const Appointment = mongoose.model('Appointment', appointmentsSchema);

//GET todos os agendamentos
router.get('/', async (req, res) => {
    try {
      const foundedAppointment = await Appointment.find();
      console.log('Agendamentos encontrados com sucesso!');
      res.status(200).json(foundedAppointment);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// GET agendamento especifico por id
router.get('/:pid', async (req, res) => {
    const pid = req.params.pid;
    try {
        const foundedAppointment = await User.findById( pid );
        console.log('Agendamento encontrado com sucesso!');
        res.json({ message: 'Agendament encontrado com sucesso!', foundedAppointment });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET agendamento especifico por nome do profissional
router.get("/professional/:professional", async (req, res) => {
    const nome = req.params.appointment;
    try {
        const docs = await Appointment.find({ appointment_professional: nome });
        res.json(docs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET personagem especifico por nome do estudante
router.get("/student/:student", async (req, res) => {
    const nome = req.params.appointment;
    try {
        const docs = await Appointment.find({ appointment_student: nome });
        res.json(docs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET personagem especifico por data
router.get("/student/:student", async (req, res) => {
    const data = req.params.appointment;
    try {
        const docs = await Appointment.find({ appointment_date: data });
        res.json(docs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST cadastro de agendamentos
router.post('/', async (req, res) => {
    const appointment = req.body.appointment;
    try {
        const newAppointment = await Appointment.create(appointment);
        console.log('Objeto salvo com sucesso!');
        res.json({ message: 'Usuário salvo com sucesso!', newAppointment });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE do registro nas funções
router.put('/:pid', async (req, res) => {
    const pid = req.params.pid;
    const newAppointment = req.body.appointment;
    console.log(newAppointment);
    try {
      const updatedAppointment = await Appointment.findByIdAndUpdate(pid, 
        {
            appointment_speciality: newAppointment.appointment_speciality, 
            appointment_comments: newAppointment.appointment_comments,
            appointment_date: newAppointment.appointment_date,
            appointment_professional: newAppointment.appointment_professional,
            appointment_student: newAppointment.appointment_student,
        }, { new: true });
      console.log('Agendamento Atualizado:', updatedAppointment);
      res.json({ message: 'Agendamento alterado com sucesso!', updatedAppointment });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// DELETE cadastro de agendamentos
router.delete('/:pid', async (req, res) => {
    const pid = req.params.pid;
    try {
        const deletedAppointment = await User.findByIdAndDelete(pid);
        console.log('Agendamento deletado:', deletedAppointment);
        res.json({ message: 'Agendamento deletado com sucesso!', deletedAppointment });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
  });

module.exports = router;