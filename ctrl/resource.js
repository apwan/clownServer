/**
 * Created by lzn on 12/28/14.
 */
 
var mongodb = require('./db').database;
var ObjectID = require('mongodb').ObjectID; 

function Resource(resource) {
	this._id = resource._id;
	this.name = resource.name;
	this.creator = resource.creator;
	this.createtime = resource.createtime;
}

Resource.prototype.createResource = function createResource(content, callback) {
	var resource = {
		name: this.name,
		creator: this.creator,
		createtime: this.createtime
	}
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('resources', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.insert(resource, {safe: true}, function(err, resourceT) {
				if (err) {
					mongodb.close();
					return callback(err);
				}
				resourceT = resourceT[0];
				var dir = './public/resources/' + resourceT._id;
				fs.writeFile(dir, content, function(err) {
					mongodb.close();
					return callback(err);
				});
			})
		});
	});
}

Resource.getContentById = function getContentById(id, callback) {
	var dir = __dirname + '/public/resources/' + id;
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		collection.findOne({_id: new ObjectID(id)}, function(err, doc) {
			mongodb.close();
			if (doc) {
				fs.readFile(dir, function(err, data) {
					if (err) {
						return callback(err);
					} else {
						return callback(err, data);
					}
				});
			} else {
				return callback(err);
			}
		});
	});
}

module.exports = Resource;