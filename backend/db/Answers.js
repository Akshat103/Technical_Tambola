var mongoose = require('mongoose');

const answersSchema = new mongoose.Schema({
    answers:Array
});


module.exports = mongoose.model('answers', answersSchema);