const express = require('express');
const router = express.Router();
const axios = require('axios');
const haversine = require('haversine');
const User = require('../models/User');
const Match = require('../models/Match');
const Interest = require('../models/Interest');
const TARGET_DIST = 50000000;
const async = require('async');
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/fetchUser', function (req, res, next) {
    User.findOne({ facebookId: req.body.facebookId })
        .populate('mainInterests')
        .exec((err, user) => {
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

router.post('/getNearbyUsers', (req, res) => {
  let {location, facebookId} = req.body;

  // location.city = 'San Francisco'; //Comment out later
  User.find({"location.city": location.city}).populate('mainInterests')
  .exec()
  .then(users => {
    let userArr = [];
    async.each(users, (selectedUser, callback) => {
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
        //filters. check for distance, Look for users who have swiped yes or not on you AND you haven't swiped on. Also only return users who are looking for the same goals.
        Match.findOne({$or : [{personA: selectedUser.facebookId, personB: facebookId}, {personA: facebookId, personB: selectedUser.facebookId, matched: true}]})
          .exec()
          .then(match => {
            if(!match || match.response) {
              //no match yet or match is a yes
              console.log("MATCH", match)
              if(match) {
                if(match.response) {
                  selectedUser = {user: selectedUser, matchme: true};

                }
              }

              var personBFacebookId = selectedUser.matchme ? selectedUser.user.facebookId : selectedUser.facebookId
              return Match.findOne({personA: facebookId, personB: personBFacebookId, response: false})
              .exec()
              .then(reverseMatch => {
                console.log("reverseMatch", reverseMatch);
                if(!reverseMatch) {
                  return selectedUser;
                }
                return false;
              })
            }
            return false;
          })

          .then(user => {
            //append to array - postpone logic to the next promise
            if(user) {
              if (user.matchme) {
                user.distance = distance;
              }
              var objToPush = user.matchme ? user : {user: selectedUser, distance};
              userArr.push(objToPush);
            }

            callback();
          })

      } else {
        callback();
      }
    }, () => {
      //do something with users.
      //TODO Score - interests, mutual friends, streaks/score/review. Rank by score.
      // console.log("USERARR", userArr);
      res.send(userArr);
    })

  })
})


router.post('/updateProfile', (req, res) => {
    let { facebookId, bio, intention, interests } = req.body;
    let interestIds = [];
    for (let interest in interests) {
        let currentInterest = interests[interest];
        Interest.findOne({
            category: currentInterest.categorySelected,
            subCategory: currentInterest.subCategorySelected,
            description: currentInterest.description
        }, (error, interest) => {
            if (error) {
                console.log('Error finding interest', error);
            } else if (interest) {
                interestIds.push(interest._id);
            } else if (!error && !interest) {
                Interest.create({
                    category: currentInterest.categorySelected,
                    subCategory: currentInterest.subCategorySelected,
                    description: currentInterest.description
                }, (error, interest) => {
                    if (error) {
                        console.log('Error saving interest:', error);
                    } else {
                        interestIds.push(interest._id);
                        if (interestIds.length === 3) {
                            User.findOneAndUpdate({ facebookId }, { bio, intention, mainInterests: interestIds, profileComplete: true }, (error, user) => {
                                if (error) {
                                    console.log('Error updating user:', error);
                                } else if (!user) {
                                    console.log('Could not find a person with id', facebookId);
                                } else {
                                    res.send('Success!');
                                }
                            })
                        }
                    }
                })
            }
        })
    }
});

module.exports = router;
