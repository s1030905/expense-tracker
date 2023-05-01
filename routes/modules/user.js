const router = require("express").Router()
const passport = require("passport")


//----------------------------------------login page
router.get("/login", (req, res) => {
  res.render("login")
})

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  successRedirect: '/'
}))

module.exports = router