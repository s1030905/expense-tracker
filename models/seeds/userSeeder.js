const User = require("../user")
const db = require("../../config/mongoose")
const SEED_USER = {
  name: '廣志',
  email: 'root@example.com',
  password: '12345678'
}

db.once("open", () => {
  User.collection.countDocuments()
    .then(n => {
      console.log(n)
      return n
    })
    .then((n) => User.create({
      id: n,
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: SEED_USER.password,
    })
      .then(() => {
        console.log("done")
        process.exit()
      })
      .catch(console.error))
    .catch(console.error)
})