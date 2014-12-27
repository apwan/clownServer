/**
 * Created by Wu Yijie on 12/26/14.
 */

var settings = require('./settings');
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

var database = new Db(settings.db, new Server(settings.host, Connection.DEFAULT_PORT), {safe:false});

var clearDataBase = function(callback) {
	var collectionList = ['users', 'slides', 'resources'];
	for (var i = 0; i < collectionList; i++) {
		database.dropCollection(collectionList[i], function(err, result){
			if (err) {
				return callback(err);
			}
		})
	}
}	

exports.database = database;
exports.clearDataBase = clearDataBase;

exports.db = {
	version: '0.0.0',
		test: function(){
	return 'database' + this.version;
}
}
