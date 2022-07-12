
const express = require('express');
const router = express.Router();
const adminController = require('../controller/admincl');

// /admin/...
router.get('/', adminController.index);
router.post('/newproduct',adminController.newproduct);
router.delete('/delete/:id',adminController.delete);

module.exports = router;
