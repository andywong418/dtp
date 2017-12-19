const express = require('express');
const router = express.Router();
const axios = require('axios');
const haversine = require('haversine');
const User = require('../models/User');
const Interest = require('../models/Interest');

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
    let { location } = req.body;
    User.find({ "location.city": location.city }, (err, users) => {
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
            let distance = haversine(start, end, { unit: 'mile' });
            if (distance > 0 && distance < TARGET_DIST) {
                distance = Math.ceil(distance * 1760 / 100) * 100;
                userArr.push({ user: selectedUser, distance });
            }
        });

        res.json(userArr);
    });
});

router.post('/updateProfile', (req, res) => {
    let { facebookId, bio, intention, interests } = req.body;
    let interestIds = [];
    for (let interest in interests) {
        let currentInterest = interests[interest];
        Interest.findOne({  // * Might be more elegant to generate a string representation/hash and search with it
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
