/**
 * Created by lzn on 1/6/15.
 */
 
 /*
 format in database:
 {
	_id: ##"" (string)
	data: ##{} (object)
	active: ##1 (1 or 0)
}
 */
 
 var mongodb = require('./db').database;
 
function PresState.createPresState = function createPresState(data, callback) {
 	var presState = {
		data: data,
		active: 1
	}
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('presstate', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.insert(presState, {safe: true}, function(err, presStateT) {
				mongodb.close();
				return callback(err, presStateT._id);
			})
		});
	});
}
 
function PresState.getPresStateById = function getPresStateById(id, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('presstate', function(err, collection) {
			if (err) {
				mogodb.close();
				return callback(err);
			}
			collection.findOne({_id: id, active: 1}, function(err, doc) {
				mongodb.close();
				if (doc) {
					return callback(err, doc.data);
				} else {
					return callback(err, null);
				}
			});
		});
	});
}
 
function PresState.updatePresStateById = function updatePresStateById(id, newData, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('presstate', function(err, collection) {
			if (err) {
				mogodb.close();
				return callback(err);
			}
			collection.update({_id: id, active: 1}, {$set: {data: newData}}, {safe: true}, function(err, result) {
				mongodb.close();
				return callback(err, result);
			});
		});
	});	
}

function PresState.deletePresStateById = function deletePresStateById(id, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('presstate', function(err, collection) {
			if (err) {
				mogodb.close();
				return callback(err);
			}
			collection.update({_id: id, active: 1}, {$set: {active: 0}}, {safe: true}, function(err, result) {
				mongodb.close();
				return callback(err, result);
			});
		});
	});	
}
 
 module.exports = PresState;