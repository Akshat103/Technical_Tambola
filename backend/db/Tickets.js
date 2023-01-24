var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const autoIncrementModelID = require('./Counter.js');

const ticketSchema = new Schema({
  id: { type: Number, unique: true, min: 1 },
  answers:Array
});

ticketSchema.pre('save', function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  autoIncrementModelID('tickets', this, next);
});

module.exports = mongoose.model('tickets', ticketSchema);