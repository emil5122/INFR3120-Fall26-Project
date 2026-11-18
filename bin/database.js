
require('dotenv').config(); // allows access to the .env file to retrieve credentials.

const mongoose = require('mongoose') 
let mongoDB

// This function is responsible for connecting to the mongodb database through the credential string stored in .env.
async function connectToDatabase(){
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT) // Async because we need to wait on mongodb to connect.
        mongoDB = mongoose.connection // set connection variable to allow for exports.
        console.log('Connected to mongodb database.') // Yay
    }catch{
        console.error('Failed to connect to mongodb database.') 
    }
}

connectToDatabase() // automatically runs the function when required() by www.
module.exports = mongoDB