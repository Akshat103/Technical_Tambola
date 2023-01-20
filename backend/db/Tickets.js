const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  id:Number,
  answers:Array
});


module.exports = mongoose.model('tickets', ticketSchema);