const router = require("express").Router()
const Record = require("../../models/record")

router.get("/", (req, res) => {
  Record.find()
    .lean()
    .then((record) => {
      res.render("index", { record })
    })
    .catch(console.error)
})

module.exports = router