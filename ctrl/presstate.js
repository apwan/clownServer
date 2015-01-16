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
 
var collections = require('./settings').collections;
var ObjectID = require('mongodb').ObjectID;
var auth = require('./db').auth;

var PresState = {
	/*
	 * 创建展示状态，并插入数据库。
	 * @param data 展示状态信息。
	 * @param resCallback 回调函数。参数为错误信息、插入返回的状态id。
	 */ 
	createPresState : function createPresState(data, resCallback) {
		var presState = {
			data: data,
			active: 1
		};
		auth(collections.present, function(collection, callback){
			collection.insert(presState, {safe: true}, callback);
		}, function(presStateT){
			if('object' == typeof presStateT) presStateT = presStateT[0];
			return presStateT? resCallback(null, presStateT._id): resCallback('not exist', null);
		}, function(err){
			return resCallback(err, null);
		});
	},
	
	/*
	 * 通过id获得展示状态信息。
	 * @param id 展示状态id。
	 * @param callback 回调函数。参数为错误信息、状态展示信息。
	 */ 
	getPresStateById : function getPresStateById(id, resCallback) {
		auth(collections.present, function(collection, callback){
			collection.findOne({_id: new ObjectID(id), active: 1}, callback);
		}, function(doc){
			return doc? resCallback(null, doc.data):resCallback('not exist', null);
		}, function(err){
			return resCallback(err, null);
		});

	},
	
	/*
	 * 更新展示状态。
	 * @param id 展示状态id
	 * @param data 展示状态信息。
	 * @param callback 回调函数。更新后的展示状态信息。
	 */ 
	updatePresStateById : function updatePresStateById(id, newData, resCallback) {
		auth(collections.present, function(collection, callback){
			collection.update({_id: new ObjectID(id), active: 1},{$set:{data: newData}}, {safe: true},callback);
		}, function(result){
			return result? resCallback(null, result.data): resCallback('not exist', null);
		}, function(err){
			return resCallback(err, null);
		});
	},
	/*
	 * 根据id删除展示状态。
	 * @param id 展示状态id。
	 * @param callback 回调函数。参数为错误信息、删除返回的object。
	 */ 
	deletePresStateById : function deletePresStateById(sid, resCallback) {
		auth(collections.present, function(collection, callback){
			collection.update({_id: new ObjectID(sid), active: 1}, {$set:{active: 0}}, {safe:true}, callback);
		}, function(result){
			return resCallback(null, result);
		}, function(err){
			return resCallback(err, null);
		});

	}
};

 module.exports = PresState;