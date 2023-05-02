const Category = require("../category")
const db = require("../../config/mongoose")
const SEED_Category = [{ name: "家居物業", id: 1 }, { name: "交通出行", id: 2 }, { name: "休閒娛樂", id: 3 }, { name: "餐飲食品", id: 4 }, { name: "其他", id: 5 }]

db.once("open", () => {
  Promise.all(SEED_Category.map(item => Category.create({ name: item.name, id: item.id })))
    .then(() => {
      console.log("done")
      process.exit()
    })
    .catch(console.error)
})