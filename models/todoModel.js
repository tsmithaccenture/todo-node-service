//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var TodoModel = new Schema({
  title: String,
  body: String,
  isComplete: Boolean
});

// Compile model from schema
module.exports = mongoose.model('todos', TodoModel );
