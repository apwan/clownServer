var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var url = require('url');
var presstate = require('../ctrl/presstate');
var ObjectID = require('mongodb').ObjectID;
var Slide = require('../ctrl/slide');


var sc = require('../ctrl/sc');
var db = require('../ctrl/db').db;
var settings = require('../ctrl/settings');
var ajaxurls = settings.urls;
/**
 * current settings.urls:{
		cfg:'/cfg', data:'/deck-data', save:'/save',
		view:'/slide-watch', pres:'/slide-change', prof:'/prof'
	}
 */


//testing
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
//testing
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
// ************************* //

router.get(ajaxurls.cfg, function(req, res){
   //TODO: get json data from database
   var p = 'public/tmp/'+(req.query.slide || settings.err_slide_id)+'.json';
   console.log('get config json', p);

   fs.readFile(p, 'utf8', function(err, data){
      if(err){
         console.log("Reading config failed");
         res.send('{current_user:{},deck:{}}');
      }else{
         res.send(data);
      }
   });
});

router.get(ajaxurls.data, function(req, res){
   var p = 'public/slides/'+(req.query.slide || '')+'.html'
   console.log('get slide contents', p);
   Slide.getContentById(req.query.slide || settings.err_slide_id, function(err, data){
      err? (console.log(err, data),
          res.send('<section><section><h1>Failed to load slide data!</h1></section></section>')):
          res.send(data);
   });
   /*
   fs.readFile(p, 'utf8', function(err, data){
      if(err){
         console.log(err);
         res.send('<section><section><h1>Failed to load slide data!</h1></section></section>');
      }else{
         res.send(data);
      }

   });
   */
});

router.get('/*.json', function(req, res){
   //TODO: get json data from database
   console.log(req.url, 'get json from file');
   fs.readFile('public/tmp' + req, function(err, data){
      if(err){
         console.log("Reading failed");
         res.send('{status: failed}');
      }else{
         res.send(data);
      }
   });
});
// TODO: change to db.saveSlide
router.put(ajaxurls.save, function(req, res){
   var slide_id = req.params[0];
   var slide_data = req.body["deck[data]"];
   fs.writeFile('public/html/'+slide_id+'.html',slide_data,function(err){
      if(err){
         console.log("Writing failed");
      }else{
         console.log("Writing successful");
      }
   });
   res.send('ok');
});

// testing 303028.json/thumbnails.json
router.put('/*.json', db.saveSlide);
router.post('/*.json', function(req, res){
   console.log(req.body);
   res.send('ok');
});




router.post('/slide-show', sc.slideShow);

router.post(ajaxurls.pres, sc.slideChange);

router.get(ajaxurls.view, sc.slideWatch);


module.exports = router;
