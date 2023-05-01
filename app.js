const express = require("express")

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const PORT = 3000 || process.env.PORT
const app = express()

app.get("/", (req, res) => {
  res.send("Hi")
})
app.listen(PORT, () => {
  console.log("http://localhost:3000")
})