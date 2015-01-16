/**
 * Created by WuYijie on 1/16/15.
 */

var db = require('./db');
var help = require('./helper');

/**
 * 异步请求（ajax）处理
 * @type {{media: Function, stream: Function, create: Function, save: Function, delete: Function, thumbnails: Function}}
 */
var op = {
    /**
     * 上传图片等资源
     * @param req
     * @param res
     */
    media: function(req, res){
        var name = 'img'+help.newID().toString();
        console.log('newID', name);
        db.saveUploadFile(req, res, name);
        //console.log(req);
        res.send('{"url": "/images/'+name+'","thumb_url": "/images/'+name+'","content_type": "image"}');

    },
    /**
     * 更新幻灯片展示状态
     * @param req
     * @param res
     */
    stream: function(req, res){

        res.send('ok');

    },
    /**
     * 创建新幻灯片
     * @param req
     * @param res
     */
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
    /**
     * 保存幻灯片内容
     * @param req
     * @param res
     * @returns {*}
     */
    save: function(req, res){
        //console.log(req);
        console.log('save',req.body['deck[data]']);
        return db.saveSlide(req, res);


    },
    /**
     * 删除某个幻灯片
     */
    delete: function(req, res){
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
    },
    /**
     * 缩略图
     * @param req
     * @param res
     */
    thumbnails: function(req, res){
        //console.log(req);
        res.send('ok');
    }

};

module.exports = op;