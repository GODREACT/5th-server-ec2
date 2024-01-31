const passport = require('passport');
const models = require('../models');
const local = require('./localStrategy');
const google = require('./googleStrategy');

module.exports = () => {
  passport.serializeUser((user, done) => {
    // console.log(user);
    done(null, user.email);
  })
  
  passport.deserializeUser((id, done) => {
    models.User.findOne({ where : { email : id } })
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(err);
      })
  })
  
  local();
  // google();
}