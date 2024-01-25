const router = require('express').Router(); 

const auth_controller = require('../controllers/auth');

router.get('/signup', auth_controller.GET_Sign_Up);
router.get('/signin', auth_controller.GET_Sign_In);
router.get('/verify_info', auth_controller.GET_Verify_Info);
router.get('/verified_info', auth_controller.GET_Verified_Info);

router.post('/signup', auth_controller.POST_Sign_Up);
router.post('/signin', auth_controller.POST_Sign_In);

router.get('/verify_token/:verify_token', auth_controller.GET_Verify_Token);

module.exports = router;