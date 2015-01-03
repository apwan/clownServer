var express = require('express');
var router = express.Router();
var fs = require('fs');
var formidable = require('formidable');
var util = require('util');
var io = require('socket.io');

// require server control
var db = require('../ctrl/db').db;
var sc = require('../ctrl/sc').sc;
var test1 = require('../test/test1');
var test2 = require('../test/test2');

/* GET home page. */
router.get('/', function (req, res) {
    var cfg = {
        title: 'CLoWN Online Presentation',
        test: {
            test_on: 'true',
            test_db: db.test(),
            test_sc: sc.test()
        }
    };
    res.render('index', cfg);

});
router.get('/edit', function (req, res) {

    var info = {
        username: 'Guest',
        slide_id: '303028'
    };
    res.render('SlidesEdit', info);



});
router.post('/upload', function (req, res) {
    var form = formidable.IncomingForm();

    form.uploadDir = 'public/tmp/';
    form.keepExtensions = true;
    form.maxFieldsSize = 2 * 1024 * 1024;
    //console.log('new formidable', form);
    //return res.redirect('/');

    var post = {},
        file = {};
    form
        .on('error', function (err) {
            console.log(err); //各种错误
        })
        //POST 普通数据 不包含文件 field 表单name value 表单value
        .on('field', function (field, value) {
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
        .on('file', function (field, file) { //上传文件
            file[field] = file;
        });
    console.log(file.path);
    res.status(typeof(req.body)).send(file.path);
    form.parse(req);
    //fs.rename(file.path, form.uploadDir + '/' + file.filename);

    //console.log(req);
});

router.use('/test1', test1);
router.use('/test2', test2);

module.exports = router;
