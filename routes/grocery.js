const express = require('express')
const router = express.Router()
const GroceryList = require('../models/groceryList')

// If the user isn't logged in, send them to the login page
function requireLogin(req, res, next) {
    if (!req.session.userID) return res.redirect('/login')
    next()
}

// Dashboard show all of the user's lists
router.get('/dashboard', requireLogin, async (req, res) => {
    let lists = await GroceryList.find({ owner: req.session.userID })
    res.render('dashboard', { lists: lists })
})

// Create a new list
router.post('/lists', requireLogin, async (req, res) => {
    await GroceryList.create({ listTitle: req.body.listTitle, owner: req.session.userID })
    res.redirect('/dashboard')
})

// Show one list and its items
router.get('/lists/:id', requireLogin, async (req, res) => {
    let list = await GroceryList.findOne({ _id: req.params.id, owner: req.session.userID })
    if (!list) return res.redirect('/dashboard')
    res.render('list', { list: list })
})

// Delete a list
router.post('/lists/:id/delete', requireLogin, async (req, res) => {
    await GroceryList.findOneAndDelete({ _id: req.params.id, owner: req.session.userID })
    res.redirect('/dashboard')
})

// Add an item to a list
router.post('/lists/:id/items', requireLogin, async (req, res) => {
    let list = await GroceryList.findOne({ _id: req.params.id, owner: req.session.userID })
    list.listItems.push({ itemName: req.body.itemName, quantity: req.body.quantity })
    await list.save()
    res.redirect('/lists/' + req.params.id)
})

// Edit an item
router.post('/lists/:id/items/:itemId/edit', requireLogin, async (req, res) => {
    let list = await GroceryList.findOne({ _id: req.params.id, owner: req.session.userID })
    let item = list.listItems.id(req.params.itemId)
    item.itemName = req.body.itemName
    item.quantity = req.body.quantity
    await list.save()
    res.redirect('/lists/' + req.params.id)
})

// Delete an item
router.post('/lists/:id/items/:itemId/delete', requireLogin, async (req, res) => {
    let list = await GroceryList.findOne({ _id: req.params.id, owner: req.session.userID })
    list.listItems.pull(req.params.itemId)
    await list.save()
    res.redirect('/lists/' + req.params.id)
})

module.exports = router