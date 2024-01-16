const router = require('express').Router(); 

const user_controller = require('../controllers/user');
 
router.get('/', user_controller.GET_Home);

module.exports = router;