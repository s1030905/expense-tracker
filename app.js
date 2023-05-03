const express = require("express")
const PORT = 3000 || process.env.PORT
const handlebars = require("express-handlebars")
const session = require("express-session")
const methodOverride = require("method-override")
const usePassport = require("./config/passport")
const flash = require("connect-flash")
const { setAuthVariablesMiddleware } = require("./middleware/auth")
const router = require("./routes/index")
require("./config/mongoose")

const app = express()
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
app.set("view engine", "handlebars")
app.engine("handlebars", handlebars({ defaultLayout: "main" }))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
usePassport(app)
app.use(flash())
app.use(setAuthVariablesMiddleware)

app.use(router)
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})