var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const autoIncrementModelID = require('./counter.js');

const userSchema = new Schema({
  id: { type: Number, unique: true, min: 1 },
  createdAt: { type: Date, default: Date.now },
  name:String,
  email:String,
  password:String
});

userSchema.pre('save', function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  autoIncrementModelID('activities', this, next);
});

module.exports = mongoose.model('players', userSchema);