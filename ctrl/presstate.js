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
 
var database = null;
var PresState = {
	setDb: function(newDb){
		database = newDb;
		console.log('database for presstate');
	},
	/*
	 * 创建展示状态，并插入数据库。
	 * @param data 展示状态信息。
	 * @param callback 回调函数。参数为错误信息、插入返回的状态id。
	 */ 
	createPresState : function createPresState(data, callback) {
		var presState = {
			data: data,
			active: 1
		};
		database.open(function(err, db) {
			if (err) {
				return callback(err);
			}
			db.collection('presstate', function(err, collection) {
				if (err) {
					database.close();
					return callback(err);
				}
				collection.insert(presState, {safe: true}, function(err, presStateT) {
					database.close();
					return callback(err, presStateT._id);
				})
			});
		});
	},
	
	/*
	 * 通过id获得展示状态信息。
	 * @param id 展示状态id。
	 * @param callback 回调函数。参数为错误信息、状态展示信息。
	 */ 
	getPresStateById : function getPresStateById(id, callback) {
		database.open(function(err, db) {
			if (err) {
				return callback(err);
			}
			db.collection('presstate', function(err, collection) {
				if (err) {
					database.close();
					return callback(err);
				}
				collection.findOne({_id: id, active: 1}, function(err, doc) {
					database.close();
					if (doc) {
						return callback(err, doc.data);
					} else {
						return callback(err, null);
					}
				});
			});
		});
	},
	
	/*
	 * 更新展示状态。
	 * @param id 展示状态id
	 * @param data 展示状态信息。
	 * @param callback 回调函数。更新后的展示状态信息。
	 */ 
	updatePresStateById : function updatePresStateById(id, newData, callback) {
		database.open(function(err, db) {
			if (err) {
				return callback(err);
			}
			db.collection('presstate', function(err, collection) {
				if (err) {
					database.close();
					return callback(err);
				}
				collection.update({_id: id, active: 1}, {$set: {data: newData}}, {safe: true}, function(err, result) {
					database.close();
					return callback(err, result.data);
				});
			});
		});	
	},

	/*
	 * 根据id删除展示状态。
	 * @param id 展示状态id。
	 * @param callback 回调函数。参数为错误信息、删除返回的object。
	 */ 
	deletePresStateById : function deletePresStateById(id, callback) {
		database.open(function(err, db) {
			if (err) {
				return callback(err);
			}
			db.collection('presstate', function(err, collection) {
				if (err) {
					database.close();
					return callback(err);
				}
				collection.update({_id: id, active: 1}, {$set: {active: 0}}, {safe: true}, function(err, result) {
					database.close();
					return callback(err, result);
				});
			});
		});	
	}
}

 module.exports = PresState;