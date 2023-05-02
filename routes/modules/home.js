const router = require("express").Router()
const Record = require("../../models/record")

router.get("/", (req, res) => {
  let userId = req.user._id
  Record.find({ userId })
    .lean()
    .then((record) => {
      res.render("index", { record })
    })
    .catch(console.error)
})

module.exports = router