const router = require("express").Router()
const Record = require("../../models/record")
const Category = require("../../models/category")

//-----------------------------------------------home
router.get("/", (req, res) => {
  let userId = req.user.id
  Record.find({ userId })
    .lean()
    .then((record) => {
      let totalAmount = 0
      record.forEach((e) => {
        totalAmount += e.amount
      })
      res.render("index", { record, totalAmount })
    })
    .catch(console.error)
})

//-----------------------------------------------分類
router.get("/:categoryId", (req, res) => {
  let categoryId = req.params.categoryId
  let userId = req.user.id
  let categoryValue = { all: false, home: false, transportation: false, entertainment: false, food: false, other: false }
  switch (categoryId) {
    case "1": categoryValue.home = true; break
    case "2": categoryValue.transportation = true; break
    case "3": categoryValue.entertainment = true; break
    case "4": categoryValue.food = true; break
    case "5": categoryValue.other = true; break
  }
  Record.find({ userId, categoryId })
    .lean()
    .then((record) => {
      let totalAmount = 0
      record.forEach((e) => {
        totalAmount += e.amount
      })
      res.render("index", { record, totalAmount, categoryValue })
    })
    .catch(console.error)
})
module.exports = router