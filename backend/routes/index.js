const express = require('express');
const router = express.Router();
const facebookAPI = require('./facebook_api');
const interestsAPI = require('./interests');
const chatroomsAPI = require('./chatrooms');

/* GET home page. */
router.use('/facebook', facebookAPI);

router.use('/interests', interestsAPI);

router.use('/chatrooms', chatroomsAPI);

router.get('/', function (req, res, next) {
  res.send("Received");
});

module.exports = router;