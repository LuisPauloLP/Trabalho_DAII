const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/bc', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log('MongoDB conectado Agendamentos');
});

mongoose.connection.on('error', (err) => {
    console.error('Erro na conexão com o MongoDB:', err);
});

const appointmentsSchema = new mongoose.Schema({
    appointment_student_name: String,
    appointment_student_surmane: String,
    appointment_professional_name: String,
    appointment_professional_surname: String,
    appointment_professional_speciality: String,
    appointment_date: { type: Date, required: true },
    appointment_time: { type: String, required: true },
    appointment_comments: String,
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
        const foundedAppointment = await Appointment.findById( pid );
        console.log('Agendamento encontrado com sucesso!');
        res.json({ message: 'Agendamento encontrado com sucesso!', foundedAppointment });
    } catch (err) {
        res.status(400).json({ message: err.message });
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
            appointment_student_name: newAppointment.appointment_student_name,
            appointment_student_surmane: newAppointment.appointment_student_surname,
            appointment_professional_name: newAppointment.appointment_professional_name,
            appointment_professional_surname: newAppointment.appointment_professional_surname,
            appointment_professional_speciality: newAppointment.appointment_professional_speciality,
            appointment_date: newAppointment.appointment_date,
            appointment_time: newAppointment.appointment_time,
            appointment_comments: newAppointment.appointment_comments,
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
        const deletedAppointment = await Appointment.findByIdAndDelete(pid);
        console.log('Agendamento deletado:', deletedAppointment);
        res.json({ message: 'Agendamento deletado com sucesso!', deletedAppointment });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
  });

module.exports = router;