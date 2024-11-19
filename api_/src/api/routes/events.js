const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/bc', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('MongoDB conectado Eventos');
});

mongoose.connection.on('error', (err) => {
  console.error('Erro na conexão com o MongoDB:', err);
});

const eventsSchema = new mongoose.Schema({
  event_title: String,
  event_description: String,
  event_comments: String,
  event_location: String,
  event_date: { type: Date, required: true },
  event_time: { type: String, required: true },
  create_date: { type: Date, default: Date.now },
  event_status: Boolean,
  author_create_date: { type: Date, default: Date.now }
});

const Event = mongoose.model('Event', eventsSchema);

//Retornar todos os eventos
// GET "/events"
router.get("/", async (req, res) => {
  try {
    const foundedEvent = await Event.find();
    console.log('Objetos encontrados com sucesso!');
    res.status(200).json(foundedEvent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Retornar um evento específico
// GET "/events/:pid"
router.get("/:pid", async (req, res) => {
  const pid = req.params.pid;
  try {
    const foundedEvent = await Event.findById( pid );
    console.log('Objeto encontrado com sucesso!');
    res.json({ message: 'Evento encontrado com sucesso!', foundedEvent });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Inserir um novo evento
// POST "/events"
router.post("/", async (req, res) => {
  const event = req.body.event;
  try {
    const newEvent = await Event.create(event);
    console.log('Objeto salvo com sucesso!');
    res.json({ message: 'Evento salvo com sucesso!', newEvent });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Alterar um evento
// PUT "/events"
router.put("/:pid", async (req, res) => {
  const pid = req.params.pid;
  const newEvent = req.body;
  console.log(newEvent);
  try {
    const updatedEvent = await Event.findByIdAndUpdate(pid,
      { 
        event_title: newEvent.event_title,
        event_description: newEvent.event_description,
        event_comments: newEvent.event_comments,
        event_date: newEvent.event_date,
        event_location: newEvent.event_location,
        event_time: newEvent.event_time,
        event_status: newEvent.event_status
       }, { new: true });
    console.log('Objeto Atualizado:', updatedEvent);
    res.json({ message: 'Evento alterado com sucesso!', updatedEvent });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Deletar um evento
// DELETE "/events/:id"
router.delete("/:pid", async (req, res) => {
  const pid = req.params.pid;
  try {
    const deletedEvent = await Event.findByIdAndDelete(pid);
    console.log('Objeto deletado:', deletedEvent);
    res.json({ message: 'Evento deletado com sucesso!', deletedEvent });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

