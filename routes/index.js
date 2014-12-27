var express = require('express');
var router = express.Router();
var fs = require('fs');
var formidable = require('formidable');
var util = require('util');
var io = require('socket.io');

// require server control
var db = require('../ctrl/db').db;
var sc = require('../ctrl/sc').sc;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express', test:'db and sc', test_db: db.test(), test_sc: sc.test() });

});
router.post('/upload', function(req, res){
  var form = formidable.IncomingForm();

  form.uploadDir = 'public/tmp/';
  form.keepExtensions = true;
  form.maxFieldsSize = 2*1024*1024;
  //console.log('new formidable', form);
  //return res.redirect('/');

  var post = {},
      file = {};
  form
      .on('error', function(err) {
        console.log(err); //各种错误
      })
    //POST 普通数据 不包含文件 field 表单name value 表单value
      .on('field', function(field, value) {
        if (form.type == 'multipart') {  //有文件上传时 enctype="multipart/form-data"
          if (field in post) { //同名表单 checkbox 返回array 同get处理
            if (util.isArray(post[field]) === false) {
              post[field] = [post[field]];
            }
            post[field].push(value);
            return;
          }
        }
        post[field] = value;
      })
      .on('file', function(field, file) { //上传文件
        file[field] = file;
      });
  console.log(file.path);
  res.status(typeof(req.body)).send(file.path);
  form.parse(req);
  fs.rename(file.path, form.uploadDir + '/' + file.filename);
      //function(err, fields, files){
    //res.writeHeaders(200, {'content-type':'text/plain'});
    //res.end(util.inspect({fields: fields, files: files}));});
  //
  //console.log(req);
});


module.exports = router;
