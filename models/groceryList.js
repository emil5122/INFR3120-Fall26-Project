const mongoose = require('mongoose')
const listItem = require('./listItem') // get the item schema

// Schema for a grocery list
let groceryList = mongoose.Schema({
    listTitle: String,
    owner: mongoose.Schema.Types.ObjectId, // id of the user who made the list
    listItems: [listItem] // array of items, each one follows the listItem schema
}, { timestamps: true }) // adds createdAt and updatedAt automatically

module.exports = mongoose.model('GroceryList', groceryList)