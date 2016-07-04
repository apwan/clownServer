/**
 * Created by WuYijie on 1/12/15.
 */


/**
 *
 * @namespace
 */
var MODELS = {

};// namespace for models
//var Slide = require('./slide');


/**
 * 图片、多媒体资源类
 * @param resource
 * @constructor
 */

MODELS.Resource = function Resource(resource){
    this.name = resource.name;
    this.creator = resource.creator;
    this.createtime = resource.createtime;
};

/**
 * 幻灯片类
 * @param slide
 * @constructor
 */
MODELS.Slide = function Slide(slide){
    //_id later assigned
    this.name = slide.name || 'deck';
    this.owner = slide.owner || slide.creator || 'guest';
    this.create_at = slide.create_at || slide.createtime || new Date().getTime();
    this.captcha = slide.captcha || '';
    this.active = slide.active || '1';
};
/**
 * 用户类
 * @param user
 * @constructor
 */
MODELS.User = function User(user){
    //_id
    this.name = user.name;
    if (noHash) {
        this.password = user.password;
    } else {
        this.password = crypto.createHash('md5').update(user.password).digest('base64');
    }
    this.email = user.email;
    this.regtime = user.regtime;
};
MODELS.User.prototype.models = function(){
    return {
        _id: this._id,
        name: this.name,
        password: this.password,
        active: this.active
    }
};

MODELS.Slide.prototype.models = function(){
    return {
        _id: this._id,
        name: this.name,
        owner: this.owner,
        active: this.active
    }
};

MODELS.Resource.prototype.models = function(){
    return {

    }
};

module.exports = (function(){
    return MODELS;
}());