/**
 * Created by lzn on 12/28/14.
 *
 * This file can only be called from db.js
 */

var fs = require('fs');
var database = null;

function Slide(slide, database_instance) {
	this._id = slide._id;
	this.name = slide.name;
	this.creator = slide.creator;
	this.createtime = slide.createtime;
	// why need captcha?
	//this.captcha = slide.captcha;
	this.active = slide.active;
	// the database instance storing this slide
	if(database_instance){
		if(database == null) {
			database = database_instance;
			console.log('init db instance for Slide');
		}
	}

}


Slide.prototype.createSlide = function createSlide(content, callback) {
	var slide = {
		name: this.name,
		creator: this.creator,
		createtime: this.createtime,
		//captcha: this.captcha,
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
				if (err) {
					database.close();
					return callback(err);
				}
				var dir = __dirname + '/public/slides/' + slideT._id;
				fs.writeFile(dir, content, function(err) {
					database.close();
					return callback(err);
				});
			})
		});
	});
}

Slide.getSlideById = function getSlideById(id, callback) {
	database.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('slides', function(err, collection) {
			if (err) {
				database.close();
				return callback(err);
			}
			collection.findOne({_id: id, active: 1}, function(err, doc) {
				database.close();
				if (doc) {
					var slide = new Slide(doc);
					return callback(err, slide);
				} else {
					return callback(err, null);
				}
			});
		});
	});
}

Slide.getContentById = function getContentById(id, callback) {
	var dir = __dirname + '/public/slides/' + id;
	database.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		collection.findOne({_id: id, active: 1}, function(err, doc) {
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
}

Slide.getIdListByCreator = function getSlideListByCreator(creator, callback) {
	database.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('slides', function(err, collection) {
			if (err) {
				database.close();
				return callback(err);
			}
			collection.find({creator: creator, active: 1}).toArray(function(err, docs) {
				database.close();
				return callback(err, docs);
			});
		});
	});
}

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
			collection.update({_id: id, active: 1}, {$set: {active: 0}}, {safe: true}, function(err, result) {
				database.close();
				return callback(err, result);
			});
		});
	});
}

module.exports = Slide;