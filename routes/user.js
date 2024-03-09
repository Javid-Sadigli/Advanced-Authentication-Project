// Our router
const router = require('express').Router(); 

// Controllers
const user_controller = require('../controllers/user');
 
/* Start handling simple get requests */ 
router.get('/', user_controller.GET_Home);
router.get('/profile', user_controller.GET_Profile);
router.get('/logout', user_controller.GET_Log_Out);
router.get('/enter_password', user_controller.GET_Enter_Password);
router.get('/change_password', user_controller.GET_Change_Password);
router.get('/change_email', user_controller.GET_Change_Email); 
router.get('/email_reset', user_controller.GET_Email_Reset);
/* End handling simple get requests */ 

/* Start handling simple post requests */ 
router.post('/enter_password', user_controller.POST_Enter_Password);
router.post('/email_reset', user_controller.POST_Email_Reset);
/* End handling simple post requests */ 

module.exports = router; // Exporting the router