var session = require('express-session')
var passport = require('passport');
var LocalStrategy = require('passport-local');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var models = require('../../models/models.js')

passport.serializeUser(function(user, done) {
  done(null, user._id);
})

passport.deserializeUser(async function(id, done) {
  let user = await models.User.findById(id);
  // if (!user) {
  //   let student = await models.Student.findById(id);
  //   let stud = student.toObject();
  //   stud.teacher = false;
  //   return done(null, stud);
  // }
  let userObj = user.toObject();
  // teach.teacher = true;
  return done(null, userObj);

});

passport.use('local-user', new LocalStrategy(function(phoneNumber, password, done) {
  models.User.findOne({username: phoneNumber }, function(err, user) {
  if(err){
    console.log(err);
    return done(err);
  }
  if(!user){
    console.log(user);
    return done(null, false, { message: 'Incorrect Username' });
  }
  if(user.password !== password){
    return done(null, false, { message: 'Incorrect Password' })
  }
  return done(null, user);
  })
}))

// passport.use('local-student', new LocalStrategy(function(username, password, done) {
//   models.Student.findOne({ username: username }, function(err, user) {
//   if(err){
//     console.log(err);
//     return done(err);
//   }
//   if(!user){
//     console.log(user);
//     return done(null, false, { message: 'Incorrect Username' });
//   }
//   if(user.password !== password){
//     return done(null, false, { message: 'Incorrect Password' })
//   }
//   return done(null, user);
//   })
// }))
