var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id:String,
  user:String,
  password:String,
  name:String
});

module.exports = mongoose.model('players', userSchema);