const Record = require("../record")
const db = require("../../config/mongoose")
const SEED_Record = [{ id: "0", name: '午餐', date: '2019-04-23', amount: '60', userId: "0", categoryId: "4" },
{ id: "1", name: '晚餐', date: '2019-04-23', amount: '60', userId: "0", categoryId: "4" },
{ id: "2", name: '捷運', date: '2019-04-23', amount: '120', userId: "0", categoryId: "2" },
{ id: "3", name: '電影:驚奇隊長', date: '2019-04-23', amount: '220', userId: "1", categoryId: "3" },
{ id: "4", name: '租金', date: '2015-04-01', amount: '25000', userId: "0", categoryId: "1" }
]

db.once("open", () => {
  Promise.all(SEED_Record.map(item => Record.create({ id: item.id, name: item.name, date: item.date, amount: item.amount, userId: item.userId, categoryId: item.categoryId })))
    .then(() => {
      console.log("done")
      process.exit()
    })
    .catch(console.error)
})
