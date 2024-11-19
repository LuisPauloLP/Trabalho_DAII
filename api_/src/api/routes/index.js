const express = require('express')
const router = express.Router()
const users = require('./users')
//const appointments = require('./appointments')
const events = require('./events')
const students = require('./students')
//const professionals = require('./professionals')
//const teachers = require('./teachers')

router.use(express.json())
router.use('/users', users)
//router.use('/appointmens', appointments)
router.use('/events', events)
router.use('/students', students)
//router.use('/professionals', professionals)
//router.use('/teachers', teachers)

module.exports = router