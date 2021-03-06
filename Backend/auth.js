// Add Passport-related auth routes here.

var express = require('express');
var router = express.Router();
var models = require('../models/models');
const databaseFunctions = require('./databaseFunctions');



module.exports = function(passport) {

  // GET registration page


  // POST registration page
  router.post('/saveUser', async (req, res) => {
    if (!req.body.phoneNumber || !req.body.password) {
      res.status(400).json({ error: 'Please enter valid username and password' });
    }
    if (req.body.password !== req.body.passwordRepeat) {
      res.status(400).json({ error: "Passwords don't match" });
    }
    try {
      await databaseFunctions.saveUser(req.body.phoneNumber, req.body.password);
      console.log(req.user)
      res.json({ success: true });

    }
    catch(error) {
      res.status(400).json({error: error.message})
    }
  });

  // router.post('/loginStudent', passport.authenticate('local-student'), (req, res) => {
  //   console.log('aye', req.user)
  //   res.status(200).json({ success: true });
  // });
  //
  // router.post('/loginTeacher', passport.authenticate('local-teacher'), (req, res) => {
  //   console.log(req.user)
  //   res.status(200).json({ success: true });
  // });
  //
  // router.get('/currentUser', (req, res) => {
  //   if (!req.user) {
  //     res.send('');
  //   } else {
  //     let user = req.user;
  //     res.send(req.user);
  //   }
  // })
  //
  //
  // // GET Logout page
  // router.get('/logout', function(req, res) {
  //   req.logout();
  //   res.send('logged out')
  //   // res.redirect('/login');
  // });

  return router;
};
