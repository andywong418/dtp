const express = require('express');
const router = express.Router();
const facebookAPI = require('./facebook_api');
const interestsAPI = require('./interests');
const chatroomsAPI = require('./chatrooms');
const usersAPI = require('./users');
const User = require('../models/User');
/* GET home page. */
router.use('/facebook', facebookAPI);

router.use('/interests', interestsAPI);

router.use('/chatrooms', chatroomsAPI);

router.use('/users', usersAPI);

router.get('/', function (req, res, next) {
  res.send("Received");
});

module.exports = router;
