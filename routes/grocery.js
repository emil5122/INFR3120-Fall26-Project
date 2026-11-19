const express = require ('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
    if(req.session.userID){ // checks to see if they are logged in before rendering dashboard.
      res.render('dashboard');
    }else{
      res.redirect('/login') // sends people to login if they arent allowed to access the page (access denied)
    }
});

module.exports = router;