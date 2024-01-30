const router = require('express').Router(); 

const auth_controller = require('../controllers/auth');

router.get('/signup', auth_controller.GET_Sign_Up);
router.get('/signin', auth_controller.GET_Sign_In);
router.get('/verify_info', auth_controller.GET_Verify_Info);
router.get('/verified_info', auth_controller.GET_Verified_Info);
router.get('/password_reset_form', auth_controller.GET_Password_Reset_Form);
router.get('/password_reset_info', auth_controller.GET_Password_Reset_Info);
router.get('/password_reset', auth_controller.GET_Password_Reset); 

router.post('/signup', auth_controller.POST_Sign_Up);
router.post('/signin', auth_controller.POST_Sign_In);
router.post('/password_reset_form', auth_controller.POST_Password_Reset_Form);
router.post('/password_reset', auth_controller.POST_Password_Reset);

router.get('/verify_token/:verify_token', auth_controller.GET_Verify_Token);
router.get('/password_reset_token/:password_reset_token', auth_controller.GET_Password_Reset_Token);

module.exports = router;