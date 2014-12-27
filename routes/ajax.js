var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
   res.send('ajax');
});

module.exports = router;