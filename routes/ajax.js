var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');

router.put('/put', function(req, res){
   var cfg = {
      username: 'Guest',
      email: 'Guest@clown.scoreur.net'
   };
   var redata = '';
   console.log("start log");
   if(req.body.username){
      res.send('Success!');
      console.log(req.body);
   }
   req.on('end', function(){
      console.log('all data: '+redata);
      res.end('ok');
   });

});
router.post('/post', function(req, res){
   if(req.body.username) {
      res.send({username: req.body.username, status: 'ok'});
      console.log(req.body.email);
   }
   else
      console.log('nobody');
});

router.get('/*.json', function(req, res){
   res.sendfile('public/tmp/template.json');

});
router.put('/*.json', function(req, res){
   res.sendfile('public/tmp/template.json');

});


module.exports = router;