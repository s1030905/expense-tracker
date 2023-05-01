const mongoose = require("mongoose")
const recordSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
    ref: "user",
    default: '644f278574d2fb63f02a3dda'
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    ref: "category",
    default: '644f278574d2fb63f02a3dda'
  }
})

module.exports = mongoose.model("record", recordSchema)