const models = require('../models/models');

function saveUser(phoneNumber, password) {
  var user = new models.User({
    phoneNumber: phoneNumber,
    password: password
  })
  return user.save();
}

module.exports = {
  saveUser: saveUser,
}
