const router = require("express").Router()
const passport = require("passport")

router.get('/facebook', passport.authenticate('facebook', {
  scope: ["email", "public_profile"]
}));

router.get('/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/user/login',
  successRedirect: '/'
}))

module.exports = router