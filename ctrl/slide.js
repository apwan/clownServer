/**
 * Created by lzn on 12/28/14.
 */
 
var mongodb = require('./db').database;

function Slide(slide) {
	this._id = slide._id;
	this.name = slide.name;
	this.creator = slide.creator;
	this.createtime = slide.createtime;
	this.captcha = slide.captcha;
	this.active = slide.active;
}

Slide.prototype.createSlide = function createSlide(content, callback) {
	var slide = {
		name: this.name,
		creator: this.creator,
		createtime: this.createtime,
		captcha: this.captcha,
		active: this.active
	}
	if (!slide.active) slide.active = 1;
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('slides', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.insert(slide, {safe: true}, function(err, slideT) {
				if (err) {
					mogodb.close();
					return callback(err);
				}
				var dir = __dirname + '/public/slides/' + slideT._id;
				fs.writeFile(dir, content, function(err) {
					mogodb.close();
					return callback(err);
				});
			})
		});
	});
}

Slide.getSlideById = function getSlideById(id, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('slides', function(err, collection) {
			if (err) {
				mogodb.close();
				return callback(err);
			}
			collection.findOne({_id: id, active: 1}, function(err, doc) {
				mongodb.close();
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
	mogodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		collection.findOne({_id: id, active: 1}, function(err, doc) {
			mogodb.close();
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
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('slides', function(err, collection) {
			if (err) {
				mogodb.close();
				return callback(err);
			}
			collection.find({creator: creator, active: 1}).toArray(function(err, docs) {
				mongodb.close();
				return callback(err, docs);
			});
		});
	});
}

Slide.deleteSlideById = function deleteSlideById(id, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('slides', function(err, collection) {
			if (err) {
				mogodb.close();
				return callback(err);
			}
			collection.update({_id: id, active: 1}, {$set: {active: 0}}, {safe: true}, function(err, result) {
				mongodb.close();
				return callback(err, result);
			});
		});
	});
}

module.exports = Slide;