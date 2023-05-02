const Category = require("../category")
const db = require("../../config/mongoose")
const SEED_Category = [{ name: "家居物業" }, { name: "交通出行" }, { name: "休閒娛樂" }, { name: "餐飲食品" }, { name: "其他" }]

db.once("open", () => {
  Promise.all(SEED_Category.map(item => Category.create({ name: item.name })))
    .then(() => {
      console.log("done")
      process.exit()
    })
    .catch(console.error)
})