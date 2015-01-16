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