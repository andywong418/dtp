const express = require('express');
const router = express.Router();
const axios = require('axios');
const haversine = require('haversine');
const User = require('../models/User');

const TARGET_DIST = 5;
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
  console.log("lat, lng", lat, lng);
  let query = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`;
  axios.get(query)
    .then(response => {
      console.log("RESPONSE", response.data);
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

router.post('/getNearbyUsers', (req, res) => {
  let {location} = req.body;
  User.find({"location.city": location.city}, (err, users) => {
    //Filter users
    let userArr = [];
    users.forEach(selectedUser => {
      const start = {
        latitude: location.lat,
        longitude: location.lng
      };
      const end = {
        latitude: selectedUser.location.lat,
        longitude: selectedUser.location.lng
      }
      let distance = haversine(start, end, {unit: 'mile'});
      if (distance > 0 && distance < TARGET_DIST) {
        distance = Math.ceil(distance*1760/100)*100;
        userArr.push({user: selectedUser, distance});
      }
    });

    res.json(userArr);
  });
})


module.exports = router;
