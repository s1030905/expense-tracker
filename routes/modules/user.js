const router = require("express").Router()
const passport = require("passport")
const User = require("../../models/user")
const bcrypt = require("bcryptjs")

//----------------------------------------login page
router.get("/login", (req, res) => {
  res.render("login")
})

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/user/login',
  successRedirect: '/',
  failureFlash: true
}))


//----------------------------------------logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

//----------------------------------------register
router.get("/register", (req, res) => {
  res.render("register")
})

router.post("/register", (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: "請填寫所有欄位" })
  }
  if (password !== confirmPassword) {
    errors.push({ message: "密碼與確認密碼不符" })
  }
  if (errors.length) {
    return res.render("register", { name, email, errors })
  }
  User.findOne({ email })
    .then((user) => {
      if (user) {
        errors.push({ message: "此電子郵件已註冊過" })
        return res.render("register", { name, email, errors })
      }
      return bcrypt.genSalt(10)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hash) => {
          User.create({ name, email, password: hash })
            .then(() => { res.redirect("/") })
            .catch(console.error)
        })
    })
    .catch(console.error)
})
module.exports = router