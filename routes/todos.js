var express = require('express');
var TodoModel = require('../models/todoModel')
var router = express.Router();


router.get('/', getTodos);
router.get('/:id', getTodosById)
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
