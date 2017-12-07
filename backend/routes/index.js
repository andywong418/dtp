const express = require('express');
const router = express.Router();
const facebookAPI = require('./facebook_api');

/* GET home page. */
router.use('/facebook', facebookAPI);

router.get('/', function (req, res, next) {
  res.send("Received");
});

module.exports = router;
