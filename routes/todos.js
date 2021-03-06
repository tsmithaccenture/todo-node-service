var express = require('express');
var TodoModel = require('../models/todoModel')
var router = express.Router();


router.get('/', getTodos);
router.get('/:id', getTodosById);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);
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

function updateTodo(req, res) {
  TodoModel.findOneAndUpdate({ _id: req.params.id },
    {
      $set:
      {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status
      }
    },
    { new: true }, (err, todo) => {
      if (err) res.send(err);
      res.json({ message: "Todo item updated!", todo })
    })
}

function deleteTodo(req, res) {
  TodoModel.findByIdAndRemove(req.params.id, (err) => {
    if (err) return res.status(500).send(err);
    const response = {
      message: "Todo successfully deleted",
      id: req.params.id
    };
    return res.status(200).send(response);
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
