const express = require("express")
const router = express.Router()
const Record = require("../../models/record")

// ---------------------------------------------------------new page
router.get("/new", (req, res) => {
  res.render("new")
})

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
  let categoryValue = { home: false, transportation: false, entertainment: false, food: false, other: false }
  Record.findOne({ _id: id })
    .lean()
    .then((record) => {
      switch (record.categoryId) {
        case 1: categoryValue.home = true; break
        case 2: categoryValue.transportation = true; break
        case 3: categoryValue.entertainment = true; break
        case 4: categoryValue.food = true; break
        case 5: categoryValue.other = true; break
      }
      res.render("edit", { record, categoryValue })
    })
    .catch(console.error)
})

router.put("/:id", (req, res) => {
  let { name, date, category, amount } = req.body
  let id = req.params.id
  Record.findOneAndUpdate({ _id: id }, { name, date, categoryId: category, amount })
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