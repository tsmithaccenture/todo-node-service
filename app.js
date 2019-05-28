var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var todosRouter = require('./routes/todos');

//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
const mongoDB = "mongodb://127.0.0.1:27017/local";
mongoose.connect(mongoDB, { 
    useNewUrlParser: true })
    .then(function(){
        console.log('Mongo Connected')
    })
    .catch(function(){
        console.log("Mongo Connection Error")
    });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/todos', todosRouter);

module.exports = app;
