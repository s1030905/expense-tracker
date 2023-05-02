const router = require("express").Router()
const Record = require("../../models/record")

router.get("/", (req, res) => {
  let userId = req.user.id
  Record.find({ userId })
    .lean()
    .then((record) => {
      let totalAmount = 0
      record.forEach((e) => {
        totalAmount += e.amount
      })
      // console.log(totalAmount)
      res.render("index", { record, totalAmount })
    })
    .catch(console.error)
})

module.exports = router