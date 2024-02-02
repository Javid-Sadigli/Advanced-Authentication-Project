const router = require('express').Router(); 

const user_controller = require('../controllers/user');
 
router.get('/', user_controller.GET_Home);
router.get('/profile', user_controller.GET_Profile);
router.get('/logout', user_controller.GET_Log_Out);
router.get('/enter_password', user_controller.GET_Enter_Password);
router.get('/change_password', user_controller.GET_Change_Password);

router.post('/enter_password', user_controller.POST_Enter_Password);

module.exports = router;