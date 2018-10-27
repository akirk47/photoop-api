const mongoose = require('mongoose');

// If you're getting an error here, it's probably because
// your connect string is not defined or incorrect.
mongoose.connection.on('connected', function() {
  console.log('Connected to MongoDb!');
})
mongoose.connect(process.env.MONGODB_URI);

const userSchema = mongoose.Schema({
  phoneNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
})

const userModel = mongoose.model('User', userSchema);

module.exports = {
  User: userModel,
};
