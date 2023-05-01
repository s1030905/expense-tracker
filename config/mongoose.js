const mongoose = require("mongoose")
const db = mongoose.connection

if (process.env.MONGODB_URI !== "production") {
  require("dotenv").config()
}
mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })

db.on("error", () => {
  console.log("db error")
})
db.once("open", () => {
  console.log("db connected")
})

module.exports = db