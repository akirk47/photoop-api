const express = require('express')
const app = express()
const databaseFunctions= require('./databaseFunctions')
var session = require('express-session')
const bodyParser= require('body-parser')
var auth = require('./auth');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var routes = require('./routes');
var models = require('../models/models')
var http = require('http')
var server = http.createServer(app);
var models = require('../models/models');
var path = require('path')

// require('../semantic/dist/semantic.min.css');
app.use(express.static(path.resolve(__dirname, '../build')))
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SECRET,
  name: 'Catscoookie',
  store: new MongoStore({ mongooseConnection: require('mongoose').connection }),
  proxy: true,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

require('./services/passport');

app.use('/', auth(passport));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/', routes);


// var socket = require('socket.io');
// io = socket(server);
//
// io.on('connection', (socket) => {
//
//   socket.on('JOIN_ROOM', async function(data){
//     socket.join(data.class);
//     var startMessages = await saveFunctions.updateLecture(data.class, data.message)
//     if(data.user && !data.message){
//       console.log('called')
//       await saveFunctions.addNewStudent(data.class, data.user)
//     }
//     socket.emit('UPDATE_MESSAGE', startMessages )
//   })
//
//   socket.on('REACTION', async function(data){
//     var reactions = await saveFunctions.updateReaction(data.class, data.user, data.reaction)
//     io.to(data.class).emit('ALL_REACTIONS', reactions)
//   })
//
//   socket.on('SEND_MESSAGE', async function(data) {
//     var message = {
//       author: data.author,
//       message: data.message,
//       date: new Date(),
//       likes: [],
//       replies: [],
//       lecture: data.class,
//       userId: data.userId
//     }
//     var messages = await saveFunctions.updateLecture(data.class, message, data.userId)
//     io.to(data.class).emit('RECEIVE_MESSAGE', messages);
//   })
//
//   socket.on('LIKE_MESSAGE', async function(data){
//     var messages = await saveFunctions.updateLikes(data.class, data.user, data)
//     io.to(data.class).emit('UPDATE_LIKES', messages)
//   })
//
//   socket.on('ADD_REPLY', async function(data) {
//     var messages = await saveFunctions.updateReplies(data.class, data.user, data)
//     io.to(data.class).emit('UPDATE_REPLIES', messages)
//   })
//
//   socket.on('UPDATE_SLIDE', async function(data) {
//     var slide = await saveFunctions.updateSlide(data.slideId, data.page)
//     io.to(data.class).emit('UPDATE_SLIDES', slide)
//   })
//
//   socket.on('TOTAL_SLIDES', async function(data) {
//     var slides = await saveFunctions.updateSlideTotal(data.slideId, data.slides)
//   })
//
//   socket.on('TEACHER_QUESTION', async function(data) {
//     var questions = await saveFunctions.updateQuestions(data)
//     console.log('questions', questions)
//     io.to(data.lectureId).emit('UPDATE_QUESTIONS', questions)
//   })
//
//   socket.on('ANSWER_QUESTION', async function(data) {
//     var questions = await saveFunctions.updateAnswers(data.questionId, data.answer, data.lectureId, data.user)
//     console.log('answer', questions)
//     io.to(data.lectureId).emit('UPDATE_QUESTIONS', questions)
//   })
// });



server.listen(process.env.PORT || 3001, () => console.log('Example app listening on port 3001!'))
