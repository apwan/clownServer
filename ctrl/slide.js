/**
 * Created by lzn on 12/28/14.
 *
 * This file can only be called from db.js
 */
 
var ObjectID = require('mongodb').ObjectID; 
var auth = require('./db').auth;
var fs = require('fs');
var database = null;
var collections = require('./settings').collections;

/**
 * Build slide instance
 * @param slide
 * @param database_instance, provided only first time
 * @constructor
 */
function Slide(slide, database_instance) {
	this._id = slide._id;
	this.name = slide.name;
	this.creator = slide.creator;
	this.createtime = slide.createtime;

	this.captcha = slide.captcha;
	this.active = slide.active;
	// the database instance storing this slide
	if(database_instance){
		if(database == null) {
			database = database_instance;
			console.log('init db instance for Slide');
		}
	}

}

/**
 *
 * @param content
 * @param callback
 */
Slide.prototype.createSlide = function createSlide(content, callback) {
	var slide = {
		name: this.name,
		creator: this.creator,
		createtime: this.createtime,
		captcha: this.captcha||null,
		active: this.active
	};
	if (!slide.active) slide.active = 1; // use true/false
	database.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('slides', function(err, collection) {
			if (err) {
				database.close();
				return callback(err);
			}
			collection.insert(slide, {safe: true}, function(err, slideT) {
				slideT = slideT[0];
				if (err) {
					database.close();
					return callback(err);
				}
				var dir = './public/slides/' + slideT._id;
				fs.writeFile(dir, content, function(err) {
					database.close();
					return callback(err);
				});
			})
		});
	});
}

Slide.getSlideById = function getSlideById(id, callback) {
	var dir = './public/slides/' + id;
	database.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('slides', function(err, collection) {
			if (err) {

				database.close();
				return callback(err);
			}
			collection.findOne({_id: new ObjectID(id), active: 1}, function(err, doc) {
				database.close();
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
	});

}
/**
 *
 * @param id
 * @param callback
 */
Slide.getContentById = function getContentById(sid, rescallback) {
	//var dir ='./public/slides/' + sid;
	auth(collections.slides_contents, function(collection, callback){
		collection.findOne({_id: new ObjectID(sid)}, callback);
	}, function(doc){
		return rescallback(null, doc.data);

	}, function(err){
		return rescallback(err, null);
	});

};

Slide.getSlideListByCreator = function getSlideListByCreator(creator, callback) {
	auth(collections.slides, function(collection, callback){
		collection.find({creator: creator, active: 1}).toArray(callback);
	}, function(docs){
		callback(null, docs);
	}, function(err){
		callback(err, null);
	});
};
/**
 *
 * @param id
 * @param callback
 */
Slide.deleteSlideById = function deleteSlideById(id, callback) {
	database.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('slides', function(err, collection) {
			if (err) {

				database.close();
				return callback(err);
			}
			collection.update({_id: new ObjectID(id), active: 1}, {$set: {active: 0}}, {safe: true}, function(err, result) {
				database.close();
				return callback(err, result);
			});
		});
	});
}

module.exports = Slide;