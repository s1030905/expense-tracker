const router = require("express").Router()
const home = require("./modules/home")
const record = require("./modules/record")
const user = require("./modules/user")
const { authenticator } = require("../middleware/auth")

router.use("/user", user)
router.use("/record", authenticator, record)
router.use("/", authenticator, home)

module.exports = router