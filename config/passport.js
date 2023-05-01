const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

//-------------------------------------------------LocalStrategy
passport.use(new LocalStrategy(
  function (name, password, done) {
    User.findOne({ name })
      .then((user) => {
        if (!user) { return done(null, false); }
        if (user.password !== password) { return done(null, false); }
        return done(null, user);
      })
  }
)); 