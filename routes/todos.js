var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  res.status('200').send({body: "Hello"});;
});

module.exports = router;
