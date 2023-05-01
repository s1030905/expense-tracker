const router = require("express").Router()
const Record = require("../../models/record")

router.get("/", (req, res) => {
  // const id = res.flushHeaders._id
  Record.find()
    .lean()
    .then((record) => {
      // console.log(record)
      res.render("index", { record })
    })
    .catch(console.error)
})

module.exports = router