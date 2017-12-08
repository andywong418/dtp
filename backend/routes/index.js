const express = require('express');
const router = express.Router();
const facebookAPI = require('./facebook_api');
const interestsAPI = require('./interests');
const User = require('../models/User');
/* GET home page. */
router.use('/facebook', facebookAPI);

router.use('/interests', interestsAPI);

router.get('/', function (req, res, next) {
  res.send("Received");
});

router.post('/fetchUser', function(req, res, next) {
  User.findOne({facebookId: req.body.facebookId}, (err, user) => {
    if(err) {
      res.send("ERROR", err);
    } else{
      console.log("USER backend", user);
      res.json(user);
    }
  })
})

module.exports = router;
