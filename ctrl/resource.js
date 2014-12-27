/**
 * Created by lzn on 12/28/14.
 */
 
var mongodb = require('./db').database;

function Resource(resource) {
	this._id = resource._id;
	this.slideid = resource.slideid
	this.name = resource.name;
	this.creator = resource.creator;
	this.createtime = resource.createtime;
}

Resource.prototype.createResource = function createSlide(content, callback) {
}

Resource.getContentById = function getContentById(id, callback) {
}

module.exports = Resource;