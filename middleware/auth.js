module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash("warning_msg", "請先登入")
    res.redirect("/user/login")
  },
  setAuthVariablesMiddleware: (req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    // console.log(req.user)
    res.locals.success_msg = req.flash("success_msg")
    res.locals.warning_msg = req.flash("warning_msg")
    next()
  }
}