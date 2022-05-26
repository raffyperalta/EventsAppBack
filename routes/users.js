var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller.js');
const passport = require('passport');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   userController.getUsers()
// });


// router.get('/users', userController.getUsers)

router.post('/login', userController.login)

router.get('/user', passport.authenticate('jwt',{session:false}), userController.getOneUser);

router.post('/register', userController.register)

module.exports = router;
