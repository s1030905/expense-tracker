const express = require("express")
const router = express.Router()
const Record = require("../../models/record")

// ---------------------------------------------------------new page
router.get("/new", (req, res) => {
  res.render("new")
})

// ---------------------------------------------------------要調整schema
router.post("/", (req, res) => {
  let { name, date, category, amount } = req.body
  let userId = req.user.id
  Record.collection.countDocuments()
    .then((count) => Record.create({ name, date, categoryId: category, amount, userId, id: count })
      .then(() => { res.redirect("/") })
      .catch(console.error))
})

// ---------------------------------------------------------edit page
router.get("/:id/edit", (req, res) => {
  let id = req.params.id
  Record.findOne({ _id: id })
    .lean()
    .then((record) => {
      let date = record.date.toISOString().slice(0, 10)
      res.render("edit", { record, date })
    })
    .catch(console.error)
})

router.put("/:id", (req, res) => {
  let { name, date, categoryId, amount } = req.body
  let id = req.params.id
  Record.findOneAndUpdate({ _id: id }, { name, date, categoryId, amount })
    .then(() => {
      res.redirect("/")
    })
    .catch(console.error)
})

// ---------------------------------------------------------delete
router.delete("/:id", (req, res) => {
  let id = req.params.id
  Record.deleteOne({ _id: id })
    .then(() => {
      res.redirect("/")
    })
    .catch(console.error)
})
module.exports = router