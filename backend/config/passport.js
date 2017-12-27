const FacebookStrategy = require('passport-facebook').Strategy;
const { User } = require('../models/User');

const passportSetUp = (passport) => {
  // passport.serializeUser((user, done) => {
  //   const userId = user.id;
  //   done(null, userId);
  // });
  //
  // passport.deserializeUser(async (id, done) => {
  //   try {
  //     const user = await User.findById(id);
  //     done(null, user);
  //   } catch (err) {
  //     done(err, null);
  //   }
  // });

  passport.serializeUser((user, done) => done(null, user));

  passport.deserializeUser((user, done) => done(null, user));

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://10.2.106.85:3000/auth/facebook/callback",
    profileFields: ['first_name', 'last_name', 'birthday', 'languages', 'hometown', 'photos', 'likes', 'interested_in', 'movies', 'music', 'television', 'favorite_teams', 'favorite_athletes', 'games', 'education', 'work', 'read_custom_friendlists'],
    scope: ['user_birthday', 'user_hometown', 'user_friends', 'read_custom_friendlists']
  }, async (accessToken, refreshToken, profile, done) => {
    console.log("facebook callback", profile._json);
    done(null, profile);
    // User.findOne({facebookId: profile.id}, (err, user) => {
    //   if(!user) {
    //     //create a new user.
    //     User.create({})
    //   }
    // })
  }
  ))
}

module.exports = passportSetUp;
