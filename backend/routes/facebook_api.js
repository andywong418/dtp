const express = require('express');
const router = express.Router();
const FB = require('fbgraph');
const User = require('../models/User');

let options = {
	timeout: 3000,
	pool: {
		maxSockets: Infinity
	},
	headers: {
		connection: 'keep-alive'
	}
};

FB.setOptions(options);

router.post('/retrieveInfo', (req, queryRes) => {
	let { token, facebookId } = req.body;
	FB.setAccessToken(token);
	FB.batch([
		{
			method: "GET",
			relative_url: "me?fields=first_name,last_name,email,gender,birthday,work,hometown,education,languages" // Get the current user's profile information 
		},
		{
			method: "GET",
			relative_url: "me/friends"
		},
		{
			method: "GET",
			relative_url: "me/likes?limit=50"
		},
		{
			method: "GET",
			relative_url: "me/albums"
		}
	], function (err, res) {
		if (err) {
			console.log(err);
		} else {
			// console.log(res);
			console.log('============================');
			let { first_name, last_name, email, gender, birthday, hometown, education, languages } = JSON.parse(res[0].body);
			hometown = hometown ? hometown.name : null;
			languages = languages ? languages.map(lang => lang.name) : null;
			education = education ?
				education = education.map(x => {
					return {
						school: x.school.name,
						type: x.type
					}
				}) : null;
			console.log('Info:');
			console.log('First Name:', first_name);
			console.log('Last Name:', last_name);
			console.log('Facebook ID:', facebookId);
			console.log('Email:', email);
			console.log('Gener:', gender);
			console.log('Birthday:', birthday);
			console.log('Hometown:', hometown);
			if (education)
				console.log('Education:', education);
			if (languages)
				console.log('Languages:', languages);
			let friends = JSON.parse(res[1].body).data;
			console.log('Friends:', friends);
			let likes = JSON.parse(res[2].body).data.map(like => like.name);
			console.log('Likes:', likes);
			let profilePics = [], profilePicsURLS = [], profileAlbumID = null;
			for (let album of JSON.parse(res[3].body).data) {
				if (album.name === 'Profile Pictures') {
					profileAlbumID = album.id;
					break;
				}
			}
			let count = 3;
			FB.get(`${profileAlbumID}/photos`, (err, photos) => {
				profilePics = photos.data.slice(0, 3);
				for (let photo of profilePics) {
					FB.get(`${photo.id}?fields=images`, (err, response) => {
						profilePicsURLS.push({
							date: photo.created_time,
							url: response.images[0].source
						});
						if (!--count) {
							profilePicsURLS.sort((a, b) => new Date(b.date) - new Date(a.date))
							console.log('Profile Pics:', profilePicsURLS);
							console.log('============================');
							User.findOne({ facebookId }, (err, user) => {
								if (err) {
									console.log('Error:', err);
								} else {
									if (user) {
										console.log('User already in the database');
										queryRes.json(user);
									} else {
										User.create({
											firstName: first_name,
											lastName: last_name,
											facebookId: req.body.facebookId,
											email,
											birthday,
											profilePic: profilePicsURLS[0].url,
											education,
											languages,
											friends,
											nonSpecificInterests: likes,
											photos: profilePicsURLS
										}, (error, user) => {
											if (error) {
												console.log('Failed to save:', error);
											} else {
												console.log('Saved succesfully!');
												queryRes.json(user);
											}
										})
									}
								}
							})
						}
					})
				}
			})
		}
	});
})

module.exports = router;