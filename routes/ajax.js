var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var url = require('url');
var presstate = require('../ctrl/presstate');
var ObjectID = require('mongodb').ObjectID;
var Slide = require('../ctrl/slide');

var settings = require('../ctrl/settings');
var ajaxurls = settings.urls;
var sc = require('../ctrl/sc');
var db = require('../ctrl/db');
var op = require('../ctrl/op');


// debug database
router.get('/', function(req, res){
   if(req.query.debug){
      var cmd = settings.debug[req.query.debug];
      if(cmd){
         db[cmd](function(err, result){
            res.send(JSON.stringify({
               cmd: cmd,
               err: err,
               result: result
            }));
         })
      }else{
         res.send('debug cmd: '+JSON.stringify(settings.debug));
      }
   }else if(req.query.op){
      console.log(req.query.op);
      return 'function' == op[req.query.op]? op[req.query.op](req, res): res.send('op not defined');

   }else{
      if(req.query.exit){

         setTimeout(process.exit, 1000);
         return res.send('exit');
      }
      return res.send('use debug cmd');
   }

});

/**
 * put/post async request
 *
*/
router.put('/', function(req, res){
   if(req.query.op){
      console.log('op', req.query.op);
      return 'function' == typeof op[req.query.op]? op[req.query.op](req, res): res.send('op not defined');

   }else{
      res.send('not defined');
   }
});

router.post('/', function(req, res){
   if(req.query.op){
      console.log('op', req.query.op);
      return 'function' == typeof op[req.query.op]? op[req.query.op](req, res): res.send('op not defined');

   }else{
      res.send('not defined');
   }
});
router.put('/', function(req, res){
   if(req.query.op){
      console.log(req.query.op);
      return 'function' == op[req.query.op]? op[req.query.op](req, res): res.send('op not defined');

   }else{
      res.send('not defined');
   }

});

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


// ************************* //

router.get(ajaxurls.cfg, function(req, res){
   //
   var p = 'public/tmp/'+settings.err_slide_id+'.json';
   console.log('get config json', p);

   fs.readFile(p, 'utf8', function(err, data){
      if(err){
         console.log("Reading config failed");
         res.send('{current_user:{},deck:{}}');
      }else{
         config = data.replace(settings.err_slide_id, req.query.slide);

         res.send(config);
      }
   });
});

router.get(ajaxurls.data, function(req, res){
   var p = 'public/slides/'+(req.query.slide || settings.err_slide_id)+'.html';
   console.log('get slide contents', p);
   db.getSlideContent(req.query.slide, function(err, data){
      err? (console.log(err, data),
          res.send('<section><section><h1>Failed to load slide data!</h1></section></section>')):
          res.send(data);
   });

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


router.post(ajaxurls.show, sc.slideShow);

router.post(ajaxurls.pres, sc.slideChange);

router.get(ajaxurls.view, sc.slideWatch);


// showing slide
router.post(ajaxurls.show, sc.slideShow);
// slide changed in presentation
router.post(ajaxurls.pres, sc.slideChange);
// audience watch presentation
router.get(ajaxurls.view, sc.slideWatch);


module.exports = router;
