var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/request', function(req, res, next) {
	console.log("asdasdasd");
  res.render('request');
});

module.exports = router;