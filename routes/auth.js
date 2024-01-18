const router = require('express').Router(); 

const auth_controller = require('../controllers/auth');

router.get('/signup', auth_controller.GET_Sign_Up);

module.exports = router;