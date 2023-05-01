const router = require("express").Router()
const home = require("./modules/home")
const record = require("./modules/record")
const user = require("./modules/user")

router.use("/user", user)
router.use("/record", record)
router.use("/", home)

module.exports = router