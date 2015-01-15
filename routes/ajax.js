var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var url = require('url');
var presstate = require('../ctrl/presstate');
var ObjectID = require('mongodb').ObjectID;
var Slide = require('../ctrl/slide');


var sc = require('../ctrl/sc');
var db = require('../ctrl/db');
var settings = require('../ctrl/settings');
var ajaxurls = settings.urls;
/**
 * current settings.urls:{
		cfg:'/cfg', data:'/deck-data', save:'/save',
		view:'/slide-watch', pres:'/slide-change', prof:'/prof'
	}
 */
// test database
router.get('/', function(req, res){
   if(req.query.debug){
      switch(req.query.debug){
         case 'clear':
            db.clearCollections(settings.collections);
            res.send('clear');
            break;
         case 'create':
            db.createCollections(settings.collections);
            res.send('create');
            break;
         default:
            res.send('undefined');
      }
   }else{
      return res.send('use debug cmd');
   }
})
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
   var p = 'public/slides/'+(req.query.slide || '')+'.html';
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


router.post(ajaxurls.show, sc.slideShow);

router.post(ajaxurls.pres, sc.slideChange);

router.get(ajaxurls.view, sc.slideWatch);

//// from newMaster

router.post('/add', function (req, res) {
   var reJson = {success: null}
   var slide = {
      name: req.body['name'],
      creator: req.session.user._id,
      captcha: '',
      createtime: new Date().getTime()
   };
   db.createSlide(slide, function(err, slideT) {
      if (!err && slideT) {
         reJson.success = 1;
         reJson._id = slideT._id;
         reJson.name = slideT.name;
         reJson.creator = slideT.creator;
         reJson.createtime = slideT.createtime;
         reJson.captcha = slideT.captcha;
         console.log(reJson);
         res.send(JSON.stringify(reJson));
      } else {
         reJson.success = 0;
         res.send(JSON.stringify(reJson));
      }
   });
});


/**
 * 开始修改一个已经存在的幻灯片
 */
router.get('/modify', function (req, res) {
   var reJson = {success: null};

   db.getSlideInfo(req.query['slideId'], function(err, slide) {
      if (!err && slide ) {//&& slide.creator.toHexString() == req.session.user._id.toHexString()

         var info = {
            username: req.query.user||req.session.user.name ||'guest',
            slide_id: req.query.slideId,
            uses:{
               loader: true,
               resume: true,
               sections: true

            },
            // buttons for editor: Tooltip, icon
            secbtns: {
               publish:['Visibility','i-unlock-stroke'],
               settings:['Settings','i-cog'], style:['style','i-brush'],
               arrange:['Arrange slides','i-layers'], //revisions:['Revision history','i-clock'],
               import:['Import','i-cloud-upload'],
               export:['Export','i-cloud-download'],
               share:['Share','i-share'], about:['About', 'i-star']
            }

         };
         console.log(info);
         res.render('slide/modify', info);

      } else {
         reJson.success = 0;
         reJson.info = '幻灯片不存在或您没有权限管理';
         res.render('info', reJson);
      }
   });
});



/**
 * 提交对某个幻灯片的修改
 */
router.post('/modify', function (req, res) {
   var reJson = {success: null};
   db.getSlideInfo(req.body['slideId'], function(err, slide) {
      if (!err && slide && slide.creator.toHexString() == req.session.user._id.toHexString()) {
         slide.name = req.body['name'];
         res.send(JSON.stringify(slide));
      } else {
         reJson.success = 0;
         //reJson.errmsg = '幻灯片不存在或您没有权限管理';
         res.send(JSON.stringify(reJson));
      }
   });
});

/**
 * 删除某个幻灯片
 */
router.get('/delete', function (req, res) {
   var reJson = {success: null};
   db.getSlideInfo(req.query['slideId'], function(err, slide) {
      console.log('string' == req.session.user._id);
      if (!err && slide && slide.creator.toHexString() == req.session.user._id.toHexString()) {
         db.deleteSlideById(req.query['slideId'], function (err) {
            if (!err) {
               reJson.success = 1;
               res.send(JSON.stringify(reJson));
            } else {
               reJson.success = 0;
               res.send(JSON.stringify(reJson));
            }
         });
      } else {
         reJson.success = 0;
         //reJson.errmsg = '幻灯片不存在或您没有权限管理';
         res.send(JSON.stringify(reJson));
      }
   });
});

/**
 * 获得某个幻灯片配置信息
 */
router.get('/getconfig', function (req, res) {
   var reJson = {success: null};
   db.getSlideInfo(req.query['slideId'], function(err, slide) {
      if (!err && slide && slide.creator == req.session.user._id) {
         reJson.success = 1;
         reJson._id = slide._id;
         reJson.name = slide.name;
         reJson.creator = slide.creator;
         reJson.createtime = slide.createtime;
         reJson.captcha = slide.captcha;
         res.send(JSON.stringify(reJson));
      } else {
         reJson.success = 0;
         //reJson.errmsg = '幻灯片不存在或您没有权限管理';
         res.send(JSON.stringify(reJson));
      }
   });
});

/**
 * 获得某个幻灯片内容
 */
router.get('/getcontent', function (req, res) {
   var reJson = {success: null};
   db.getSlideInfo(req.query['slideId'], function(err, slide) {
      if (!err && slide && slide.creator == req.session.user._id) {
         db.getSlideContent(req.query['slideId'], function(err, content) {
            if (!err) {
               reJson.success = 1;
               reJson.content = content;
               res.send(JSON.stringify(reJson));
            } else {
               reJson.success = 0;
               res.send(JSON.stringify(reJson));
            }
         });
      } else {
         reJson.success = 0;
         //reJson.errmsg = '幻灯片不存在或您没有权限管理';
         res.send(JSON.stringify(reJson));
      }
   });
});


module.exports = router;
