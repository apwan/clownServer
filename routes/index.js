var express = require('express');
var router = express.Router();
var fs = require('fs');
var formidable = require('formidable');
var util = require('util');
var session = require('express-session');
var io = null;
var server = null;

// require server control
var db = require('../ctrl/db').db;
var sc = require('../ctrl/sc');
var test1 = require('../test/test1');
var test2 = require('../test/test2');

/* GET home page. */
router.get('/', function (req, res) {
    console.log(req.session.cookie._expires);
    console.log(req);
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
                publish:['Visibility','i-unlock-stroke'], settings:['Settings','i-cog'], style:['style','i-brush'],
                arrange:['Arrange slides','i-layers'], revisions:['Revision history','i-clock'], import:['Import','i-cloud-upload'],
                export:['Export','i-cloud-download'], share:['Share','i-share'], about:['About', 'i-star']
            }

        };
        res.render('edit', info);
    }else{
        var cfg = {
            title: 'CLoWN Online Presentation',
            test: {
                test_on: 'true',
                test_db: db.test(),
                test_sc: sc.test()
            }
        };
        res.render('index', cfg);
    }


});
router.get('/edit', function (req, res) {
    res.redirect('/?user=Guest&slide=303028');


});
router.post('/upload', db.saveUploadFile);

router.get('/login', function(req, res){
   console.log(req.session.user || {});
    res.render('login',{});
});
router.post('/reg', db.signup);

router.get('/reg', function(req, res){
    console.log(req.session.user || {});
    res.render('reg',{});
});
router.post('/login', db.login);

router.use('/test1', test1);
router.use('/test2', test2);


// set up io
var setup = function(newServer){
    server = newServer;
    io = require('socket.io')(server);
    sc.setIO(io);
    io.on('connection', sc.onConnection);
    console.log('socket setup');
};

exports.init = setup;
exports.router = router;

