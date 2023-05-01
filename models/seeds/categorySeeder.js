const Category = require("../category")
const db = require("../../config/mongoose")
const SEED_Category = {
  name: "餐飲食品"
}

db.once("open", () => {
  Category.create({
    name: SEED_Category.name
  })
  console.log("done")
})