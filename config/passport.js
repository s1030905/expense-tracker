const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const User = require("../models/user")

module.exports = app => {

  //-------------------------------------------------initialize
  app.use(passport.initialize())
  app.use(passport.session())
  //-------------------------------------------------LocalStrategy
  passport.use(new LocalStrategy(({ usernameField: "email" }), (email, password, done) => {
    User.findOne({ email })
      .then((user) => {
        if (!user) { return done(null, false, { type: "warning_msg", message: "尚未註冊" }) }
        if (user.password !== password) { return done(null, false, { type: "warning_msg", message: "密碼錯誤" }) }
        return done(null, user)
      })
      .catch(console.error)
  }
  ));

  //-------------------------------------------------serializeUser & deserializeUser
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((user) => done(null, user))
      .catch(console.error)
  });
}
