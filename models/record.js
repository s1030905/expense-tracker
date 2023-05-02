const mongoose = require("mongoose")
const recordSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  categoryId: {
    type: Number,
    required: true,
    index: true,
    ref: "category.id",
  },
  userId: {
    type: Number,
    required: true,
    index: true,
    ref: "user.id",
  },

})

module.exports = mongoose.model("record", recordSchema)