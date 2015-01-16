/**
 * Created by lzn on 12/28/14.
 */


var database = null;
var auth = require('./db'),auth;
var crypto = require('crypto');
var collections = require('./settings').collections;

/* //TODO migrate to models.js
 * 构造函数
 * @param user 包含用于构造用户object的初始属性
 * @param noHash 是否对密码作hash
 */
function User(user, noHash, database_instance) {
	this._id = user._id;
    this.name = user.name;
	if (noHash) { 
		this.password = user.password;
	} else {
		this.password = crypto.createHash('md5').update(user.password).digest('base64');
	}
	this.email = user.email;
	this.regtime = user.regtime;


}

/*
 * 将该用户信息插入数据库
 * @param callback 回调函数。参数为返回的object。
 */
User.prototype.createUser = function createUser(resCallback) {
	var user = {
		name: this.name,
		password: this.password,
		email: this.email,
		regtime: new Date().getTime()
	};
	auth(collections.users, function(collection, callback){
		collection.insert(user, {safe:true}, callback);
	}, function(userT){
		return resCallback(null, userT);
	}, function(err){
		return resCallback(err, null);
	});
};

/*
 * 检查用户名密码
 * @param callback 回调函数。参数为错误信息、登陆成功的用户对象。
 */
User.prototype.checkPassword = function checkPassword(resCallback) {
	var query = {
		name: this.name,
		password: this.password
	};
	auth(collections.users, function(collection, callback){
		collection.findOne(query, callback);
	}, function(userT){ //查询成功，userT可能为空
		return resCallback(userT);
	}, function(err){ //查询失败，返回空
		console.log(err);
		return resCallback(null);
	});
};

/*
 * 通过用户名获得用户object
 * @param username 用户名。
 * @param callback 回调函数。参数为：错误信息、用户object。
 */
User.getUserByName = function (username, resCallback) {
	auth(collections, function(collection, callback){
		collection.findOne({name: username}, callback);
	}, function(doc){
		return resCallback(null, new User(doc));
	}, function(err){
		return resCallback(err, null);
	});
};

/*
 * 从数据库删除给定用户名的用户。
 * @param username 用户名
 * @param callback 回调函数。参数为：错误信息、结果object。
 */
User.deleteUserByName = function (username, resCallback) {
	auth(collections, function(collection, callback){
		collection.deleteMany({name: username}, callback);
	}, function(result){
		return resCallback(null, result);
	}, function(err){
		return resCallback(err, null);
	});
};

module.exports = User;