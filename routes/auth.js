const express = require ('express');
const router = express.Router();
const mongoose = require('mongoose')
const user = require('../models/user'); // Schema for users.
const bcrypt = require('bcrypt') // allows for secure hashing of passwords.
const saltRounds = 5 // Determines salt rounds used for bcrypt.


// GET Routes (Returns pages)

// Returns the login page.
router.get('/login', (req, res) => {
    res.render('login', { error: 'none' });
});

//Showsmthe registration page
router.get('/register', (req, res) => {
    res.render('register', { error: 'none' });
});

//Showsmthe registration page
router.get('/logout', (req, res) => {
    res.render('logout', { error: 'none' });
});

//Showsmthe registration page
router.get('/accountmanagement', (req, res) => {
    res.render('accountManagement', { passResetError: 'none', deletionError: 'none' });
});


// POST Routes/API

// Used to create a new user, user must send desired username + password, then check db if username is taken.
router.post('/auth/register/newUser', async (req, res) => {
    try{
        let {UserUsername, UserPassword} = req.body // Gets the username and password from req.body which have been sent over by the form.
        let search = await user.findOne({username: UserUsername}) // Checks to see if the database already contains someone with the same username.
        console.log(search) 
        if(!search){ // If we didnt find one then we know the database does not contain someone with the same user.
            // Calculate hash for password + salt
            let hash = await bcrypt.hash(UserPassword, saltRounds)
            let newUser = new user({ // Creates a new user from schema, pulling the username and bcrypt hash from the bcrypt function.
                username: UserUsername,
                passwordHash: hash, // Storing hash because storing plaintext passwords is bad practice.
                groceryLists: [] // creates an empty grocery list to be populated later.
            })
            await newUser.save().then( // Debug information after it saves, also lets user know its been created.
                console.log(newUser),
                res.render('register', { error: 'Created, you may log in.' }) // Change this later, should not be using error for messages.
            )
        }else{
            res.render('register', { error: 'Username taken, pick a different one.' }); // if we did find a database entry, this username cannot be chosen.
            return // return just incase res.render doesnt work. (probably redudant)
        }
    }catch(err){
        console.log(err)
        res.render('register', { error: 'An unknown error occured, please retry.' }); // Responds to the user so we dont leave them hanging in case of error.
    }
});

// Used to delete a user, user must send username + password along with this request.
router.delete('/auth/register/deleteUser', (req, res) => {
    res.json('deleting user');
});

// Used to update a user password, user must send username + password along with this request.
router.patch('/auth/register/updateUser', (req, res) => {
    res.json('updating user');
});


router.post('/auth/logout', async (req,res) =>{
    if(req.session.userID){
        try{
            req.session.destroy() // deletes session.
            res.redirect('/')
        }catch(err){
            print(err)
            res.render('logout', { error: 'Error logging out!' });
        }
    }else{
         res.render('logout', { error: 'not logged in!' });
    }
})

// Handles logging in functionality, user sends username + password, check db after hashing.
router.post('/auth/login', async (req, res) => {
    let {UserUsername, UserPassword} = req.body // Gets the username and password from req.body which have been sent over by the form.
    console.log(UserUsername, UserPassword)

    let search = await user.findOne({username: UserUsername}) // search to see if the user actually exists.
    if(!search){
        console.log('not found.') // we werent able to find the user.
        // Wrong password or username. Do not proceed.
        res.render('login', { error: 'Incorrect Username or Password, Try Again' });
    }else{
        console.log('found') // we found an entry in the database with the username, we will now compare passwords.
        // verify 
        let bcryptResult = await bcrypt.compare(UserPassword, search.passwordHash) // Bcrypt verifies the password provided againts what is in the database.
        if (bcryptResult == true){ // True means they match.
           req.session.userID = search._id // sets session userID to mongodb file.
           req.session.save(() =>{
                res.render('login', { error: 'Logged in!' }); // Success
           })
    
           console.log(req.session.userID)
        }else{ //  Bcrypt returned false, they do not match. The user may not log in.
             // Wrong password or username. Do not proceed.
             res.render('login', { error: 'Incorrect Username or Password, Try Again' });
        }
    }

});

module.exports = router;