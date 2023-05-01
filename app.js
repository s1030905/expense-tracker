const express = require("express")
const PORT = 3000 || process.env.PORT
const handlebars = require("express-handlebars")
const methodOverride = require("method-override")
const router = require("./routes/index")
require("./config/mongoose")

const app = express()
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}


app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.set("view engine", "handlebars")
app.engine("handlebars", handlebars({ defaultLayout: "main" }))
app.use(router)
app.listen(PORT, () => {
  console.log("http://localhost:3000")
})