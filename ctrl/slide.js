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
}

Slide.prototype.createSlide = function createSlide(content, callback) {
}

Slide.getSlideById = function getSlideById(id, callback) {
}

Slide.getContentById = function getContentById(id, callback) {
}

Slide.getIdListByCreator = function getIdListByCreator(creator, callback) {
}

Slide.deleteSlideById = function deleteSlideById(id, callback) {
}

module.exports = Slide;