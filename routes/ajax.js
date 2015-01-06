var express = require('express');

var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var url = require('url');
var presstate = require('../ctrl/presstate');

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


/**
 * 展示者通过post一个url, 开始一个展示
 * 生成一个链接用以观看展示
 * @param req - post request
 * @param res - post result
 */
router.post('/slide-show/', function slideShow(req, res) {
   console.log('slide show post recv');
   reqBody = req.body;
   if (reqBody.command == 'start') {
      var now = (new Date()).getTime();
      // 新建展示
      presstate.createPresState({'slideId': reqBody.slideId,
                                 'startTime': now,
                                 'lastChangeTime': now,
                                 'state': {}
                                 }, function (err, presId) {
         if (err && !presId) {
            console.log('error when creating presentation state');
            return res.send(JSON.stringify({
               success: 0
            }));
         }
         urlParts = {
                  'protocol': 'http',
                  'host': 'localhost:3000',
                  'pathname': '/ajax/slide-watch',
                  'query': {
                     'presId': presId
                     }
                  };

         return res.send(JSON.stringify({
            success: 1,
            presId: presId,
            watchUrl: url.format(urlParts)

         }));
      });
   }
   else if (reqBody.command == 'end') {
      // broadcast to this show room
      io.to(reqBody.presId).emit('show end');
      presstate.deletePresStateById(reqBody.presId, function (err, data) {
         if (err) {
            console.log('erorr when deleting presentation state');
         }
      });
   }
});


/**
 * 展示者切换slides
 * @param {Object} req - 字段为presId, newState
 * @param {Object} res - 字段为success, errStr或者data
 */
router.post('/slide-change/', function slideChange(req, res) {
   console.log('slide change recv');
   var reqBody = req.body;
   presstate.getPresStateById(reqBody.presId, function(err, data) {
      if (err) {
         console.log('error when getting presentation state ' + reqBody.presId);
         res.send(JSON.stringify({
            success: 0,
            errStr: '数据库端错误'
         }));
      }
      else if (!data) {
         console.log('no active presentation state found ' + reqBody.presId);
         res.send(JSON.stringify({
            success: 0,
            errStr: '不存在当前展示'
         }));
      }
      else {
         presstate.updatePresStateById(reqBody.presId, {
            'slideId': data.slideId,
            'startTime': data.startTime,
            'lastChangeTime': (new Date()).getTime(),
            'state': reqBody.newState
         }, function (err, data) {
            if (err) {
               console.log('error when updating presentation state');
            }
            else {
               // 广播切换slides信息
               io.to(reqBody.presId).emit('slide change');
               res.send(JSON.stringify({
                  success: 1,
                  data: data
               }));
            }
         });
      }
   });
});

/**
 * 通过Get特定url, 用户开始观看某个展示, 具体加入房间在socket里处理
 * 具体得到slides内容由用户再次ajax方式get
 * @param req - get request
 * @param res - get result
 */
router.get('/slide-watch', function slideWatch(req, res) {
      console.log('slide watch recv');
      var query = url.parse(req.url, true).query;
      var username = req.session.user.name;
      function renderOrSend(resObj) {
         res.format({
            'text/html': function() {
               //跳转方式
               res.render('watching', resObj);
            },
            'application/json': function() {
               // ajax方式
               res.send(JSON.stringify(resObj));
            }
         })
      }
      presstate.getPresStateById(query.presId, function (err, data) {
         if (err) {
            console.log('error when getting presentation state ' + reqBody.presId);
            renderOrSend({
               success: 0,
               errStr: '数据库端错误',
               username: username
            });
         }
         else if (!data) {
            console.log('no active presentation state found ' + reqBody.presId);
            renderOrSend({
               success: 0,
               errStr: '不存在当前展示',
               username: username
            });
         }
         else {
            renderOrSend({
               success: 1,
               username: username
            });
         }
      });
});
module.exports = router;
