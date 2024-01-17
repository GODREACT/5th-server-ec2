const passport = require('passport');
const { User } = require('../models');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
})

passport.deserializeUser(function (user, done) {
  done(null, user);
})

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `http://localhost:3000/success`
  },
  async (accessToken, refreshToken, profile, cb) => {
    const {
      _json: {id, avatar_url, name, email}
    } = profile;

    try {
      const user = await User.findOne({ email: email})

      if(user) {
        return cb(null, user)
      } else {
        const newUser = await User.create({
          email: email,
          nickname: name,
        })
      }
    } catch(err) {
      console.log(err);
    }
  })
)