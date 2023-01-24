var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:String,
  email:String,
  password:String,
  id:String
});

module.exports = mongoose.model('players', userSchema);