const express = require('express');
const router = express.Router();
const axios = require('axios');
const User = require('../models/User');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/fetchUser', function (req, res, next) {
  User.findOne({ facebookId: req.body.facebookId }, (err, user) => {
    if (err) {
      res.send("ERROR", err);
    } else {
      res.json(user);
    }
  })
});

router.post('/updateLocation', function (req, res, next) {
  let key = process.env.GOOGLE_API_KEY;
  let { lat, lng, facebookId } = req.body;
  let query = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`;
  axios.get(query)
    .then(response => {
      let city = response.data.results[0].address_components[3].long_name;
      User.findOneAndUpdate({ facebookId }, {
        location: {
          lat,
          lng,
          city
        }
      }, (err, user) => {
        if (err) {
          res.send("Error:", err);
        } else if (!user) {
          res.send('User not found');
        } else {
          res.send(city);
        }
      })
    })
    .catch(error => {
      console.log('Error:', error);
    })
});


module.exports = router;
