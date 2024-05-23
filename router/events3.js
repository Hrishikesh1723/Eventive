const express = require('express')

const Event = require('./events2')

const router = express.Router()

router.put('/event/:id', Event.updateEvent)
router.delete('/event/:id', Event.deleteEvent)
router.delete('/userevent/:id', Event.deleteUserEvent)
router.get('/event/:id', Event.getEventById)
router.get('/events', Event.getEvents)
  
module.exports = router 