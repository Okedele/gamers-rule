var repository = require("../Models/UserModel/User.repository");
var express = require('express');
var router = express.Router();

router.post('/create',repository.createUser);
router.post('/get',repository.getUser);

module.exports = router;