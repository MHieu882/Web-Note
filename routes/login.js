const express = require('express');
const router = express.Router();
const logincontroller = require('../controller/logincl');

//login/...
router.get('/', logincontroller.index);
router.post('/sigin', logincontroller.login);
router.get('/logout',logincontroller.logout)
router.post('/register', logincontroller.register);
router.get('/changepass',logincontroller.Changepassword);
router.post('/changepasss',logincontroller.Changepass);
router.get('/logout',logincontroller.logout)
module.exports = router;
