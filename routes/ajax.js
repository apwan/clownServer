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
router.post('/*/thumbnails.json', function(req, res){
   console.log(req.url, req.body);
   res.send('ok');
});

router.get('/*.json', function(req, res){
   //TODO: get json data from database
   fs.readFile('public/tmp/'+req.url, 'utf8', function(err, data){
      if(err){
         console.log("Reading failed");
         res.send('failed');
      }else{
         res.send(data);
      }
   });
});
router.put('/*.json', function(req, res){
   //console.log(req.body["deck[data]"]);
   var slide_id = req.params[0];
   var slide_data = req.body["deck[data]"];
   console.log(slide_id);
   /*
   fs.writeFile('public/html/'+slide_id+'.html',slide_data,function(err){
      if(err){
         console.log("Writing failed");
      }else{
         console.log("Writing successful");
      }
   });
   */
   //console.log(req.body);
   res.send('ok');
});
router.post('/*.json', function(req, res){
   console.log(req.body);
   res.send('ok');
});



module.exports = router;
