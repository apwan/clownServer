/**
 * Created by lzn on 12/28/14.
 */
 
var collections = require('./settings').collections;
var ObjectID = require('mongodb').ObjectID; 
var database = null;
var auth = require('./db').auth;


function Resource(resource) {
	this._id = resource._id;
	this.name = resource.name;
	this.creator = resource.creator;
	this.createtime = resource.createtime;
}

Resource.prototype.createResource = function createResource(content, resCallback) {
	var resource = {
		name: this.name,
		creator: this.creator,
		createtime: this.createtime
	};
	auth(collections.resources, function(collection, callback){
		collection.insert(resource, {safe: true}, callback);

	}, function(resourceT){
		resourceT = 'object'==typeof resourceT? resourceT[0]:resourceT;
		var dir = './public/resources/' + resourceT._id;
		fs.writeFile(dir, content, resCallback);

	}, resCallback);

};

Resource.getContentById = function getContentById(id, rescallback) {
	var dir = __dirname + '/public/resources/' + id;
	auth(collections.resources, function(collection, callback){
		collection.findOne({_id: new ObjectID(id)}, callback);
	}, function(doc){
		if(doc){
			fs.readFile(dir, rescallback);
		}
	}, function(err){
		return rescallback(err, null);
	});
};

module.exports = Resource;