const Record = require("../record")
const db = require("../../config/mongoose")
const SEED_Record = {
  name: '午餐',
  date: '2019.04.23',
  amount: '60',
  userId: "644f278574d2fb63f02a3dda",
  categoryId: "644f2aa68d7ddd3c54a8e9e1"
}

db.once("open", () => {
  Record.create({
    name: SEED_Record.name,
    date: SEED_Record.date,
    amount: SEED_Record.amount,
    userId: SEED_Record.userId,
    categoryId: SEED_Record.categoryId
  })
    .then(() => {
      console.log("done")
      process.exit()
    })
    .catch(console.error)
})

