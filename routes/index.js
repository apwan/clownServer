var express = require('express');
var router = express.Router();
var fs = require('fs');
var formidable = require('formidable');
var util = require('util');
var session = require('express-session');
var settings = require('../ctrl/settings');
var io = null;
var server = null;
var gravatar = require('gravatar');

// require server control
var db = require('../ctrl/db');
var sc = require('../ctrl/sc');
// frontend unit test
router.use('/test', require('./unit-test'));
// server test
router.use('/test1', require('../test/test1'));

/* GET home page. */
router.get('/', function (req, res) {
    console.log(req.session.cookie._expires);
    if(req.query.user && req.query.slide){
        var info = {
            username: req.session.user || req.query.user,
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
                arrange:['Arrange slides','i-layers'] //,revisions:['Revision history','i-clock'],
                //import:['Import','i-cloud-upload'],
                //export:['Export','i-cloud-download'],
                //share:['Share','i-share'],
                // about:['About', 'i-star']
            }

        };
        res.render('edit', info);
    }else if(req.session.user){
        var reJson = {
            login: 1,
            name: req.session.user.name || 'guest',
            email: req.session.user.email|| 'guest@scoreur.net',
            avatar: gravatar.url(req.session.user.email ,  {s: '100', r: 'x', d: 'retro'}, true)
        };
        db.getSlideList(req.session.user._id, function(err, docs) {
            if(err){
                console.log(err);
                reJson.slideList = null;
            }else{
                reJson.slideList = docs;
                //console.log('get slide list: ', docs);
            }
            res.render('space', reJson);
        });



    }else{
        res.render('login',{});

    }
});

/**
 * Login
 */
router.post('/', function(req, res){
    var reJson = {
        receive: 1,
        success: 0
    };
    var checkUser = {
        name: req.body['username'],
        password: req.body['password']
    };

    return db.login(checkUser, function(err, userT){
        if(err || !userT){
            req.session.user = null;
            reJson.success = 0;
            reJson.errmsg = err || '用户不存在或密码不符';
            res.send(JSON.stringify(reJson));

        }else{
            console.log('user pass:', userT);
            req.session.user = userT;
            reJson.success = 1;
            //res.send(JSON.stringify(erJson));
            res.redirect('/user');


        }
    });
});


/**
 * User sign up
 */
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

/**
 * Slide Edit
 */
router.get('/edit', function (req, res) {		
    res.redirect('/?user=Guest&slide='+settings.err_slide_id);

});

router.use('/user', require('./user'));


// set up socket io

module.exports = function(newServer){
        server = newServer,
            io = require('socket.io')(server),
            sc.setIO(io),
            io.on('connection', sc.onConnection),
	    server.listen(3000),
            console.log('socket setup');
        return router;
};

