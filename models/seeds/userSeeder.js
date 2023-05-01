const User = require("../user")
const db = require("../../config/mongoose")
const SEED_USER = {
  name: '廣志',
  email: 'root@example.com',
  password: '12345678'
}

db.once("open", () => {
  User.create({
    name: SEED_USER.name,
    email: SEED_USER.email,
    password: SEED_USER.password,
  })
    .then(() => console.log("done"))
    .catch(console.error)
})