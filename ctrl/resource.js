/**
 * Created by lzn on 12/28/14.
 */
 
var database = null;

function Resource(resource, database_instance) {
	this._id = resource._id;
	this.name = resource.name;
	this.creator = resource.creator;
	this.createtime = resource.createtime;

	if(database_instance){
		if(database == null){
			database = database_instance;
			console.log('init db instance for Resource');
		}
	}
}

Resource.prototype.createResource = function createResource(content, callback) {
	var resource = {
		name: this.name,
		creator: this.creator,
		createtime: this.createtime
	};
	database.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('resources', function(err, collection) {
			if (err) {
				database.close();
				return callback(err);
			}
			collection.insert(resource, {safe: true}, function(err, resourceT) {
				if (err) {
					database.close();
					return callback(err);
				}
				var dir = __dirname + '/public/resources/' + resourceT._id;
				fs.writeFile(dir, content, function(err) {
					database.close();
					return callback(err);
				});
			})
		});
	});
}

Resource.getContentById = function getContentById(id, callback) {
	var dir = __dirname + '/public/resources/' + id;
	database.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection.findOne({_id: id}, function(err, doc) {
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

module.exports = Resource;