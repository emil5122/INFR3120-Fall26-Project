const {default: mongoose, Collection} = require('mongoose')

let userModel = mongoose.Schema({
    username: {type: String, required: true, unique: true}, // usernames must be unique and are required.
    passwordHash: {type: String, required: true}, // passwords would be bad if they were unique, but they are required.
    // groceryList: [] // This is where all the grocery lists will go.
})

module.exports=mongoose.model('User', userModel)


/*
1. Users are the schema used for users, within the groceryList array they can hold groceryLists.

2. Grocery lists have a string for their listName and an array for list items.
Grocery lists should be appended to the users groceryLists array. 

3. List items are the individual items on the grocery list, they should be appended to listItems within the selected
grocery list. They need to be givena name and a quantity.


Example Json Structure from MongoDB
{
  "_id": {
    "$oid": "6afd247d925fcabc5c2f6e96"
  },
  "username": "TestUsername",
  "passwordHash": "Hash",
  "groceryLists": {
    "list1": {
      "listTitle": "My First List",
      "listItems": {
        "item": {
          "itemName": "Banana",
          "quantity": 1
        }
      }
    }
  }
}
*/
