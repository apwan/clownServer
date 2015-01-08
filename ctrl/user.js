/**
 * Created by lzn on 12/28/14.
 */

var database = null;
var crypto = require('crypto');

/*
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
	if(database_instance){
		if(database == null){
			database = database_instance;
			console.log('init db instance for User');
		}
	}

}

/*
 * 将该用户信息插入数据库
 * @param callback 回调函数。参数为返回的object。
 */
User.prototype.createUser = function createUser(callback) {
	var user = {
		name: this.name,
		password: this.password,
		email: this.email,
		regtime: new Date().getTime()
	};
	database.open(function(err, db) {
		if (err) {
			return callback(err, null);
		}
		db.collection('users', function(err, collection) {
			if (err) {
				database.close();
				return console.log(err), callback(err, null);
			}
			collection.ensureIndex('name', {unique: true}, function(err){
				if(err)
					return console.log(err), callback(err, null);
			});
			collection.insert(user, {safe: true}, function(err, userT) {
				database.close();
				return err? (console.log(err), callback(err, null)):callback(null, userT);
			})
		});
	});
};

/*
 * 检查用户名密码
 * @param callback 回调函数。参数为错误信息、登陆成功的用户对象。
 */
User.prototype.checkPassword = function checkPassword(callback) {
	var query = {
		name: this.name,
		password: this.password
	}
	database.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('users', function(err, collection) {
			if (err) {
				return database.close(), callback(err);
			}
			collection.findOne(query, function(err, doc) {
				database.close();
				return doc? callback(new User(doc, 1)): (console.log(err), callback(null));

			});
		});
	});	
}

/*
 * 通过用户名获得用户object
 * @param username 用户名。
 * @param callback 回调函数。参数为：错误信息、用户object。
 */
User.getUserByName = function (username, callback) {
	database.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('users', function(err, collection) {
			database.close();
			if (err) {
				return callback(err);
			}
			collection.findOne({name: username}, function(err, doc) {

				return doc? callback(null, new User(doc)): (cosole.log(err), callback(err, null));

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
	database.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('users', function(err, collection) {
			if (err) {
				database.close();
				return callback(err);
			}
			collection.deleteMany({name: username}, function(err, result) {
				database.close();
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