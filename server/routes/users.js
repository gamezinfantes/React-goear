var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login/', function(req, res, next) {
  if(req.params.username=='lara' && req.params.password=='1234') {
    
  } else {

  }
});

module.exports = router;
