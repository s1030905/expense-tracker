const User = require("../user")
const db = require("../../config/mongoose")
const bcrypt = require("bcryptjs")
const SEED_USER = [{ name: '廣志', email: 'root@example.com', password: '12345678', id: 0 },
{ name: '小新', email: 'root2@example.com', password: '123456789', id: 1 }]

db.once("open", () => {
  for (let i = 0; i < 2; i++) {
    bcrypt.genSalt(10)
      .then((salt) => bcrypt.hash(SEED_USER[i].password, salt))
      .then(hash => User.create({
        name: SEED_USER[i].name, email: SEED_USER[i].email,
        password: hash, id: SEED_USER[i].id
      }))
      .then(() => {
        console.log("done")
        process.exit()
      })
      .catch(console.error)
  }
})