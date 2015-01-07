/**
 * Created by Wu Yijie on 12/26/14.
 */

var settings = require('./settings');
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;



var db = {
	database: new Db(settings.db, new Server(settings.host, Connection.DEFAULT_PORT), {safe:false}),
	clearDB: function(callback) {
		var collectionList = ['users', 'slides', 'resources'];
		for (var i = 0; i < collectionList; i++) {
			this.database.dropCollection(collectionList[i], function (err, result) {
				if (err) {
					return callback(err);
				}
			});
		}

	},

	saveSlide: function(req, res){
		//console.log(req.body["deck[data]"]);
		var slide_id = req.params[0];
		var slide_data = req.body["deck[data]"];
		console.log(slide_id);

		//TODO: insert to database

		res.send('ok');
	},











	test: function(){
		return settings.host;
	}

};


exports.database = db.database;
exports.clearDataBase = db.clearDataBase;

exports.db = db;

console.log('Database Module Loading Successful!');