const router = require('express').Router(); 

const auth_controller = require('../controllers/auth');

router.get('/signup', auth_controller.GET_Sign_Up);
router.get('/signin', auth_controller.GET_Sign_In);

router.post('/signup', auth_controller.POST_Sign_Up);

module.exports = router;