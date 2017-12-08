const express = require('express');
const router = express.Router();
const facebookAPI = require('./facebook_api');
const interestsAPI = require('./interests');

/* GET home page. */
router.use('/facebook', facebookAPI);

router.use('/interests', interestsAPI);

router.get('/', function (req, res, next) {
  res.send("Received");
});

module.exports = router;