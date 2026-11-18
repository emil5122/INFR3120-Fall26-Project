const mongoose = require('mongoose');

let listItem = mongoose.Schema({
  itemName: String,
  quantity: Number
})

module.exports = listItem 