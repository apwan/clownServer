var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  fs.readFile('public/html/sample.html', 'utf-8', function(err, data){
    if(err){
      console.error(err);
      res.send("not found");
    }else{
      console.log(data);
      res.send(data);
    }
  });

});
router.get('/img', function(req, res){
  res.sendfile('public/images/background_cwx.jpg');
});
router.get('/txt', function(req, res){
  res.sendfile('public/html/sample.html');
});

module.exports = router;
