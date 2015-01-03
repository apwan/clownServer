/**
 * Created by lzn on 12/28/14.
 */

var mongodb = require('./db').database;

/*
 * 构造函数
 * @param user 包含用于构造用户object的初始属性
 */
function User(user) {
	this._id = user._id;
    this.name = user.name;
	this.password = user.password;
	this.email = user.email;
	this.regtime = user.regtime;
}

/*
 * 将该用户信息插入数据库
 * @param callback 回调函数。参数为错误信息、插入返回的object。
 */
User.prototype.createUser = function createUser(callback) {
	var user = {
		name: this.name,
		password: this.password,
		email: this.email,
		regtime: (new Date()).getDay()
	}
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('users', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.ensureIndex('name', {unique: true});
			collection.insert(user, {safe: true}, function(err, userT) {
				mongodb.close();
				return callback(err, userT);
			})
		});
	});
};

/*
 * 通过用户名获得用户object
 * @param username 用户名。
 * @param callback 回调函数。参数为：错误信息、用户object。
 */
User.getUserByName = function (username, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('users', function(err, collection) {
			if (err) {
				mogodb.close();
				return callback(err);
			}
			collection.findOne({name: username}, function(err, doc) {
				mongodb.close();
				if (doc) {
					var user = new User(doc);
					return callback(err, user);
				} else {
					return callback(err, null);
				}
			});
		});
	});
};

/*
 * 从数据库删除给定用户名的用户。
 * @param username 用户名
 * @param callback 回调函数。参数为：错误信息、结果object。
 */
User.deleteUserByName = function (username, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('users', function(err, collection) {
			if (err) {
				mogodb.close();
				return callback(err);
			}
			collection.deleteMany({name: username}, function(err, result) {
				mongodb.close();
				if (err) {
					return callback(err);
				} else {
					return callback(err, result);
				}
			});
		});
	});
};

module.exports = User;