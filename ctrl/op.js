/**
 * Created by WuYijie on 1/16/15.
 */

var db = require('./db');
var help = require('./helper');

var op = {
    media: function(req, res){
        var name = 'img'+help.newID().toString();
        console.log('newID', name);
        db.saveUploadFile(req, res, name);
        //console.log(req);
        res.send('{"url": "/images/'+name+'","thumb_url": "/images/'+name+'","content_type": "image"}');

    },
    stream: function(req, res){

        res.send('ok');

    },
    create: function(req, res){
        var reJson = {success: 0};
        var slide = {
            name: req.body['name'],
            creator: req.session.user._id,
            captcha: '',
            createtime: new Date().getTime()
        };
        console.log('create', slide);
        db.createSlide(slide, function(err, slideT) {
            if (!err && slideT) {
                slideT = 'object' == typeof slideT? slideT[0]: slideT;
                console.log('slideT', slideT);
                reJson.success = 1;
                reJson._id = slideT._id;
                reJson.name = slideT.name;
                reJson.creator = slideT.creator;
                reJson.createtime = slideT.createtime;
                reJson.captcha = slideT.captcha;
                console.log(reJson);
                res.send(JSON.stringify(reJson));
            } else {
                console.log(err);
                reJson.success = 0;
                res.send(JSON.stringify(reJson));
            }
        });
    },
    save: function(req, res){
        //console.log(req);
        console.log('save',req.body['deck[data]']);
        return db.saveSlide(req, res);


    },
    thumbnails: function(req, res){
        //console.log(req);
        res.send('ok');
    }

};

module.exports = op;