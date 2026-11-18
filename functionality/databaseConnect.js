
require('dotenv').config(); // allows access to the .env file to retrieve credentials.

const mongoose = require('mongoose') 


// This function is responsible for connecting to the mongodb database through the credential string stored in .env.
async function connectToDatabase(){
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT) // Async because we need to wait on mongodb to connect.
        console.log('Connected to mongodb database.') // Yay
    }catch{
        console.error('Failed to connect to mongodb database.') // Aww :(, erroring because cant continue without it (bad)
    }
}

connectToDatabase() // automatically runs the function when required() by www.