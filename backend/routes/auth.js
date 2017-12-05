var express = require('express');
var router = express.Router();
const {User} = require('./models');


const auth = (passport) => {
  router.get('/auth/facebook/', passport.authenticate('facebook'));

  router.get('/auth/facebook/callback', passport.authenticate('facebook'), function(req, res){
    res.json(req.user);
  })
}

module.exports = router;
