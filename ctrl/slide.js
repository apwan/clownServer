/**
 * Created by lzn on 12/28/14.
 *
 * This file can only be called from db.js
 */

var collections = require('./settings').collections;
var ObjectID = require('mongodb').ObjectID; 
var auth = require('./db').auth;
var fs = require('fs');


/**
 * //TODO: migrate to models.js
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

}

/**
 *
 * @param content
 * @param resCallback
 */
Slide.prototype.createSlide = function createSlide(content, resallback) {
	var slide = {
		name: this.name,
		creator: this.creator,
		createtime: this.createtime,
		captcha: this.captcha||null,
		active: this.active
	};
	slide.active = 1; // use true/false
	auth(collections.slides, function(collection, callback){
		collection.insert(slide, {safe: true}, callback);
	}, function(slideT){
		if('object' == typeof slideT) slideT = slideT[0];
		var dir = './public/slide/' + slideT && slideT._id || 'null';
		fs.writeFile(dir, content, function(err){
			return resCallback(err);
		});

	}, function(err){
		return resCallback(err);
	});

};

Slide.getSlideById = function getSlideById(sid, resCallback) {

	auth(collections.slides, function(collection, callback){
		collection.findOne({_id: new ObjectID(sid), active: 1}, callback);
	}, function(slideT){
		if(slideT){
			resCallback(null, slideT);
		}else{
			return resCallback('not exist', null);
		}
	}, function(err){
		return resCallback(err);
	});

};

/**
 *
 * @param sid
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
Slide.deleteSlideById = function deleteSlideById(sid, resCallback) {
	auth(collections.slides, function(collection, callback){
		collection.update({_id: new ObjectID(sid), active: 1}, {$set:{active: 0}},{safe:true}, callback);
	}, function(result){
		return resCallback(null, result);
	}, function(err){
		return resCallback(err, null);
	});

};

module.exports = Slide;