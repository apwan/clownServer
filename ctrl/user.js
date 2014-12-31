/**
 * Created by lzn on 12/28/14.
 */

var mongodb = require('./db').database;

function User(user) {
	this._id = user._id;
    this.name = user.name;
	this.password = user.password;
	this.email = user.email;
	this.regtime = user.regtime;
}

User.prototype.createUser = function createUser(callback) {
	var user = {
		name: this.name,
		password: this.password,
		email: this.email,
		regtime: new Date().now()
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
				mogodb.close();
				callback(err, userT);
			})
		});
	});
};

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
					callback(err, user);
				} else {
					callback(err, null);
				}
			});
		});
	});
};

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
					callback(err);
				} else {
					callback(err, result);
				}
			});
		});
	});
};

module.exports = User;