const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/usercl');

//index
router.get('/', usercontroller.index);
//create news
router.get('/getnews', usercontroller.createnews);
router.post('/newproduct',usercontroller.newproduct);
//detail news
// router.get('/product/:id',usercontroller.showdetail);
//update news
router.get('/news/:id',usercontroller.update);
router.put('/news/update/:id',usercontroller.getupdate);


module.exports = router;
