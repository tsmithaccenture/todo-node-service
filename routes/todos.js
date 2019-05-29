var express = require('express');
var app = require('../app');
var TodoModel = require('../models/todoModel')
var router = express.Router();


router.get('/', getTodos);
router.get('/:id', getTodosById);
router.put('/:id', updateTodo);
router.post('/', addTodo);

function getTodos(req, res){
  TodoModel.find({}, (err, items) => {
    res.json(items)
  }) 
}

function getTodosById(req, res){
  TodoModel.findById(req.params.id, (err, item) => {
    if (err)
            res.send(err);
        res.json({
            data: item
        });
  })
}

function updateTodo(req, res){
  TodoModel.findById({_id: req.params.id}, (err, todo) => {
    if(err) res.send(err);
    Object.assign(todo, res.body).save((err, todo) => {
      if(err) res.send(err);
      res.json({message: "Todo item updated!", todo})
    })
  })
}

function addTodo(req, res) {
  var newItem = new TodoModel({
    title: req.body.title,
    body: req.body.body
  });

  newItem.save(function(err) {
    if(err) {
      res.json({'ERROR': err});
    } else {
      res.json({'SUCCESS': newItem});
    }
  });
}

module.exports = router;
