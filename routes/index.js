var express = require('express');
var router = express.Router();
var fs = require('fs');
var formidable = require('formidable');
var util = require('util');
var session = require('express-session');
var settings = require('../ctrl/settings');
var io = null;
var server = null;

// require server control
var db = require('../ctrl/db');
var sc = require('../ctrl/sc');
var test1 = require('../test/test1');

/* GET home page. */
router.get('/', function (req, res) {
    console.log(req.session.cookie._expires);
    if(req.session.user){
        console.log(req.session.user);
    }
    //console.log(req.query);
    if(req.query.user && req.query.slide){
        var info = {
            username: req.query.user,
            slide_id: req.query.slide,
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
                //import:['Import','i-cloud-upload'],
                //export:['Export','i-cloud-download'],
                //share:['Share','i-share'], about:['About', 'i-star']
            }

        };
        res.render('edit', info);
    }else{
        res.redirect('/login');

    }


});
router.get('/edit', function (req, res) {
    res.redirect('/?user=Guest&slide='+settings.err_slide_id);


});
router.post('/upload', db.saveUploadFile);

router.get('/login', function(req, res){
   console.log(req.session.user || {});
    res.render('login',{});
});
router.post('/reg', function(req, res){
    console.log(req.body);
    var reJson = {
        receive: 1,
        success: 0
    };
    if (req.body['repassword'] != req.body['password']) {
        reJson.errmsg = '两次输入的口令不一致';
        res.send(JSON.stringify(reJson));
    } else if (req.body['password'] == '') {
        reJson.errmsg = '密码不能为空';
        res.send(JSON.stringify(reJson));
    } else if (req.body['username'] && req.body['username'].length < 3) {
        reJson.errmsg = '用户名小于3个字符';
        res.send(JSON.stringify(reJson));
    } else {
        return db.signUp(req, res);
    }
});

router.get('/reg', function(req, res){
    console.log(req.session.user || {});
    res.render('reg',{});
});
router.post('/login', function(req, res){

    return db.login(req, res);
});

router.use('/test1', test1);
router.use('/test', require('./unit-test'));

router.use('/user', require('./user'));

// set up io


module.exports = function(newServer){
        server = newServer,
            io = require('socket.io')(server),
            sc.setIO(io),
            io.on('connection', sc.onConnection),
            console.log('socket setup');
        return router;
};

