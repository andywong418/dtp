var express = require('express');
var router = express.Router();
const {User} = require('../models/User');


const auth = (passport) => {
  router.get('/auth/facebook', passport.authenticate('facebook'));

  // router.get('/auth/facebook/callback', passport.authenticate('facebook'), function(req, res){
  //   console.log("REQ", req.user);
  //   res.json(req.user);
  // })

  router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/login'
    }),
    function (req, res) {
      // Successful authentication, redirect home.
      console.log('auth/fb/cb');
      res.redirect('/');
    }
  );

  return router;
}

module.exports = auth;
