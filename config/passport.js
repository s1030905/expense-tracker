const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const FacebookStrategy = require("passport-facebook").Strategy
const User = require("../models/user")
const bcrypt = require("bcryptjs")

module.exports = app => {

  //-------------------------------------------------initialize
  app.use(passport.initialize())
  app.use(passport.session())
  //-------------------------------------------------LocalStrategy
  passport.use(new LocalStrategy(({ usernameField: "email" }), (email, password, done) => {
    User.findOne({ email })
      .then((user) => {
        if (!user) { return done(null, false, { type: "warning_msg", message: "尚未註冊" }) }
        return bcrypt.compare(password, user.password)
          .then((isMatch) => {
            if (!isMatch) {
              return done(null, false, { type: "warning_msg", message: "密碼錯誤" })
            }
            return done(null, user)
          })
      })
      .catch(console.error)
  }
  ));

  //-------------------------------------------------FacebookStrategy
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ["email", "displayName"]
  },

    // -----------------------------------------------------設定登入密碼
    (accessToken, refreshToken, profile, done) => {
      let { name, email } = profile._json
      User.findOne({ email })
        .then((user) => {
          if (user) { return done(null, user) }
          let passwordTemp = Math.random().toString(36).slice(-8)
          bcrypt.genSalt(10)
            .then((salt) => bcrypt.hash(passwordTemp, salt))
            .then((hash) => {
              User.create({ name: name, password: hash, email })
            })
            .then((user) => done(null, user))
            .catch(err => done(err, false))
        })
    }
  ))

  //-------------------------------------------------serializeUser & deserializeUser
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch(console.error)
  });
}
