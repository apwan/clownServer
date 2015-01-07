var express = require('express');

var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var url = require('url');
var presstate = require('../ctrl/presstate');
var slidedb = require('../ctrl/slide');
var sc = require('../ctrl/sc');

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

/**
 * 从数据库中取出展示状态并返回
 */
/*router.get('/stream.json', function(req, res){
   var presId = req.query.presId;
   console.log('ajax get stream.json: ', presId);
   presstate.getPresStateById(presId, function(err, data) {
      if (err) {
         console.log('error when getting presentation state ' + reqBody.presId);
         res.send({
            success: 0,
            errStr: '数据库端错误'
         });
      }
      else if (!data) {
         console.log('no active presentation state found ' + reqBody.presId);
         res.send({
            success: 0,
            errStr: '不存在当前展示'
         });
      }
      else {
         res.send({
            success: 1,
            data: data
         });
      }
   });
});
*/

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
      slidedb.getContentById(reqBody.slideId, function(err, contents) {
         if (err || !contents) {
            return res.send({
               success: 0,
               errStr: '无法获取该slide'
            });
         }
         presstate.createPresState({'slideId': reqBody.slideId,
                                 'startTime': now,
                                 'lastChangeTime': now,
                                 'state': '{}'
                                 }, function (err, presId) {
            if (err && !presId) {
               console.log('error when creating presentation state');
               return res.send({
                  success: 0,
                  errStr: '创建新的展示失败'
               });
            }
            var urlParts = {
                     'protocol': 'http',
                     'host': 'localhost:3000',
                     'pathname': '/ajax/slide-watch',
                     'query': {
                        'presId': presId.toString()
                        }
                     };

            return res.send({
               success: 1,
               presId: presId.toString(),
               watchUrl: url.format(urlParts),
               contents: contents
            });
         });
      });
   }
   else if (reqBody.command == 'end') {
      // broadcast to this show room
      sc.broadcastToRoom(reqBody.presId, 'show end');
      presstate.deletePresStateById(reqBody.presId, function (err, data) {
         if (err) {
            console.log('erorr when deleting presentation state');
         }
         res.end();
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
         res.send({
            success: 0,
            errStr: '数据库端错误'
         });
      }
      else if (!data) {
         console.log('no active presentation state found ' + reqBody.presId);
         res.send({
            success: 0,
            errStr: '不存在当前展示'
         });
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
               return res.send({
                  success: 0,
                  errStr: '更新展示状态失败'
               });
            }
            else {
               // 广播切换slides信息
               console.log('成功更新展示状态');
               sc.broadcastToRoom(reqBody.presId, 'slide change');
               return res.send({
                  success: 1,
                  data: data
               });
            }
         });
      }
   });
});

/**
 * 通过Ajax Get特定url, 用户开始观看某个展示, 具体加入房间在socket里处理
 * 具体得到slides内容由用户再次ajax方式get
 * @param req - get request
 * @param res - get result
 */
router.get('/slide-watch', function slideWatch(req, res) {
      console.log('slide watch recv');
      //var presId = url.parse(req.url, true).query.presId；
      var presId = req.query.presId;
      // 从session中得到用户名
      //var username = req.session.user.name;
      var username = 'NingXuefei';
      var command = req.query.command;

      presstate.getPresStateById(presId, function (err, data) {
         if (err) {
            console.log('error when getting presentation state ' + reqBody.presId + ': ' + err);
            res.send({
               presId: presId,
               success: 0,
               errStr: '数据库端错误',
               username: username
            });
         }
         else if (!data) {
            console.log('no active presentation state found ' + reqBody.presId);
            res.send({
               presId: presId,
               success: 0,
               errStr: '不存在当前展示',
               username: username
            });
         }
         else {
            if (command == "contents") {
               // 获取内容
               slidedb.getContentById(data.slideId, function(err, contents) {
                  if (err || !contents) {
                     return res.send({
                        success: 0,
                        errStr: '获取内容失败'
                     });
                  }
                  res.send({
                     success: 1,
                     contents: contents
                  });
               });
            }
            else if (command == "newstate") {
               // 回发newstate
               res.send({
                  success: 1,
                  data: data
               });
            }
            else {
               res.send({
                  presId: presId,
                  success: 1,
                  username: username
               });
            }
         }
      });
});
module.exports = router;
