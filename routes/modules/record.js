const express = require("express")
const router = express.Router()
const Record = require("../../models/record")

router.get("/new", (req, res) => {
  res.render("new")
})
router.post("/", (req, res) => {
  const { name, date, category, amount } = req.body
  Record.create({ name, date, category, amount })
    .then((record) => {
      res.redirect("/")
    })
    .catch(console.error)
})



module.exports = router