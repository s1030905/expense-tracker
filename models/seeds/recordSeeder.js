const Record = require("../record")
const db = require("../../config/mongoose")
const SEED_Record = {
  id: "0",
  name: '午餐',
  date: '2019.04.23',
  amount: '60',
  userId: "0",
  categoryId: "4"
}

db.once("open", () => {
  Record.create({
    id: SEED_Record.id,
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

