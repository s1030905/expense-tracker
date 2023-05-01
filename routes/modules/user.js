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

//----------------------------------------logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router