const express = require("express")
const handlebars = require("express-handlebars")
require("./config/mongoose")

const app = express()
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

app.set("view engine", "handlebars")
app.engine("handlebars", handlebars({ defaultLayout: "main" }))

const PORT = 3000 || process.env.PORT

app.get("/", (req, res) => {
  res.send("Hi")
})
app.listen(PORT, () => {
  console.log("http://localhost:3000")
})