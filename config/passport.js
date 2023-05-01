const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

module.exports = app => {

  //-------------------------------------------------initialize
  app.use(passport.initialize())
  app.use(passport.session())
  //-------------------------------------------------LocalStrategy
  passport.use(new LocalStrategy(
    function (name, password, done) {
      User.findOne({ name })
        .then((user) => {
          if (!user) { return done(null, false); }
          if (user.password !== password) { return done(null, false); }
          return done(null, user);
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
      .then((user) => done(err, user))
      .catch(console.error)
  });
}
