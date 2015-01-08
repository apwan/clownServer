/**
 * Created by Wu Yijie on 12/26/14.
 */

var settings = require('./settings');
var mongodb = require('mongodb');
var Db = mongodb.Db;
var Connection = mongodb.Connection;
server = new mongodb.Server(settings.host, settings.port, {auto_reconnect: true});
var Slide = require('./slide');
var User = require('./user');
var Resource = require('./resource');
var PresState = require('./presstate');
var fs = require('fs');
var formidable = require('formidable');


var db = {
	guest: null,
	sample_slide: null,
	sample_resource: null,
	database: null,
	clearDB: function(callback) {
		var collectionList = ['users', 'slides', 'resources', 'sessions'];
		for (var i in collectionList) {
			this.database.dropCollection(i, function (err, result) {
				if (err) {
					return callback(err);
				}
				console.log("dropped: "+ i);
			});
		}
		console.log('database cleared');

	},
    // initialize database module
	init: function(){

		/*
		 var addr = 'mongodb://'+settings.dbuser+':'+settings.dbpwd+'@'+settings.host+':'+settings.port+'/'+ settings.db;
		 console.log(addr);
		Db.connect(addr, function(err, db) {
			if(err){
				console.log(err);
				return;
			}
			this.database = db;
			console.log(">> Dropping collection test");
			db.dropCollection('test', function(err, result) {
				if(err){
					console.log(err);

				}
				console.dir(result);
			});

		});*/
		this.database = new Db(settings.db, server, {safe:true});
		//this.clearDB();
		this.guest = new User({_id:'20150001', name:'guest',password:'', email:'guest@scoreur.net', regtime:''}, true, this.database);
		this.sample_slide = new Slide({_id:'20150001', name:'sample_slide',creator:'guest',createtime:'201501010000'},
			this.database);
		this.sample_resource = new Resource({_id:'20150001', name:'sample_image',creator:'guest',createtime:'201501010100'},
			this.database);
		PresState.setDb(this.database);

	},


	saveSlide: function(req, res){
		//console.log(req.body["deck[data]"]);
		var slide_id = req.params[0];
		var slide_data = req.body["deck[data]"];
		console.log(slide_id);

		//TODO: insert to database

		res.send('ok');
	},
	//TODO: change to saving upload resource in database
	saveUploadFile: function (req, res) {
		var form = formidable.IncomingForm();

		form.uploadDir = 'public/tmp/';
		form.keepExtensions = true;
		form.maxFieldsSize = 2 * 1024 * 1024;

		console.log('new formidable', form);

		//return res.redirect('/');

		form.
			on('progress', function (byteReceived, byteExpected) {

			}).
			on('field', function (name, value) {
				//console.log(name, value);

			}).
			on('fileBegin', function (name, file) {
				console.log('new file', name);
				var newPath = 'public/tmp/newfile';
				file.path = newPath;


				console.log('filepath:', file.path);


			}).
			on('file', function (name, file) {

			}).
			on('err', function (err) {

			});
		form.parse(req);

		return res.redirect('/');
	},

	login: function(req, res){
		var reJson = {
			receive: 1
		}
		var user = new User({
			name: req.body['username'] || null,
			password: req.body['password'] || null
		});
		//res.send(JSON.stringify(user));
		user.checkPassword(function(userT) {
			if (userT) {
				req.session.user = userT;
				reJson.success = 1;
				res.send(JSON.stringify(reJson));
			} else {
				req.session.user = null;
				reJson.success = 0;
				res.send(JSON.stringify(reJson));
			}
		});
	},
	signup: function(req, res){
		var reJson = {
			receive: 1
		};
		if (req.body['repassword'] != req.body['password']) {
			reJson.success = 0;
			reJson.errmsg = '两次输入的口令不一致';
			res.send(JSON.stringify(reJson));
		} else if (req.body['password'] == '') {
			reJson.success = 0;
			reJson.errmsg = '密码不能为空';
			res.send(JSON.stringify(reJson));
		} else if (req.body['username'] && req.body['username'].length < 3) {
			reJson.success = 0;
			reJson.errmsg = '用户名小于3个字符';
			res.send(JSON.stringify(reJson));
		} else {
			User.getUserByName(req.body['username']||null, function(err, userT) {
				//userT && (reJson.success = 0, reJson.errmsg = '用户名已存在') && res.send(JSON.stringify());
				if (userT) {
					reJson.success = 0;
					reJson.errmsg = '用户名已存在';
					res.send(JSON.stringify(reJson));
				} else {
					var newUser = new User({
						name: req.body['username']||'',
						email: req.body['email']||'',
						password: req.body['password']||''
					});
					newUser.createUser(function(err, userT) {
						if (err) {
							reJson.success = 0;
							reJson.errmsg = err;
							console.log('err:', err);
							res.send(JSON.stringify(reJson));
						} else {
							req.session.user = userT;
							reJson.success = 1;
							res.render('login', {receive: 1, name: userT.name, password: userT.password});
							//res.send(JSON.stringify(reJson));
						}
					});
				}
			});
		}
	},










	test: function(){
		return 'ok';
	}

};


exports.database = db.database;
exports.clearDataBase = db.clearDataBase;

exports.db = db;

console.log('Database Module Loading Successful!');