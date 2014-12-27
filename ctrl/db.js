/**
 * Created by Wu Yijie on 12/26/14.
 */

var settings = require('./settings');
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

var db = {

    version: '0.0.0',
	
	database : new Db(settings.db, new Server(settings.host, Connection.DEFAULT_PORT, {})),
	
	ClearDatabase: function(callback){
		var collectionList = ["users", "slides", "resources"];
		for (var i = 0; i < collectionList; i++){
			database.dropCollection(collectionList[i], function(err, result){
				if (err) {
					return callback(err);
				}
			})
		}
	}	
}

exports.db = db;