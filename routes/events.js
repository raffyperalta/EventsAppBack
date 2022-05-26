var express = require('express');
var router = express.Router();
const eventController = require('../controllers/event.controller.js');
const atttendeeController = require('../controllers/event.controller.js');
const passport = require('passport');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send()
// });

router.get('/', eventController.getEvents)

router.get('/:id', eventController.getSpecificEvents)

router.put('/update/:id', eventController.updateEvent)

router.post('/create', eventController.createEvent)

router.delete('/delete/:id', eventController.deleteEvent)

router.post('/addAttendee', atttendeeController.addAttendee)

module.exports = router;
