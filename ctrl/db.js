/**
 * Created by Wu Yijie on 12/26/14.
 */

var settings = require('./settings');
var collections = settings.collections;
var mongodb = require('mongodb');

var crypto = require('crypto');
var fs = require('fs');
var formidable = require('formidable');

var models = require('./models');
// END of dependency



var ObjectId = mongodb.ObjectID;
//var Connection = mongodb.Connection;
var server = new mongodb.Server(settings.db.host, settings.db.port,
	{auto_reconnect: false});
var database = new mongodb.Db(settings.db.name, server, {safe:true});




/**
 * 提供数据库认证连接
 * @param collectionName 数据表名(为数组时进行批量并行操作)
 * @param successCallback 回调参数为collection及下一级callback, 进行数据库操作
 * @param nextCallback 回调参数为数据库操作返回结果, 对结果进行处理
 * @param errCallback 回调参数为err
 *
 * @note successCallback 到 nextcallback之间经过auth的处理，包括关闭数据库连接的操作,
 *       可以在nextcallback中进行多项操作（嵌套回调），再调用auth的callback
 */
var auth = function auth(collectionName, successCallback, nextCallback, errCallback){
	//认证连接
	database.open(function(err, db) {
		if(err || !db){
			// 未指定errcallback时控制台输出err
			return errCallback? (console.log('db open failed'), errCallback(err)):console.log(err);
		}
		// 数据库已开启成功，开始权限认证
		db.authenticate(settings.db.admin, settings.db.pwd, function (err, result) {
			if (err) {
				db.close();
				// 未指定errcallback时控制台输出err
				return errCallback? errCallback(err): console.log('auth: '+result, err);
			} else {
				var watchdog = function(){
					db.close(true), errCallback? errCallback('forcely close db connection'):
						console.log('forcely close db connection');
				};
				if('function' == typeof collectionName) {
					errCallback = nextCallback, nextCallback = successCallback,
						successCallback = collectionName, collectionName = null;
				}
				//console.log('auth:', result)
				if('object' == typeof collectionName && collectionName.length) {
				// parallel operation among several collections
					var not_completed = collectionName.length;
					var errmsg = '';
					var resmsg = '';
					for(var i in collectionName){
						successCallback(db, collectionName[i], function(err, result){
							--not_completed;
							if(err){
								errmsg += err+';';
							}else{
								result = 'object'==typeof result? JSON.stringify(result): result;
							}
							if(!not_completed){
								db.close(), watchdog = function(){};
								return nextCallback? nextCallback(errmsg, resmsg):console.log(errmsg, resmsg);
							}
						});
					}


				}else if('string' == typeof collectionName){
				// specific collection
						db.collection(collectionName, function (err, collection) {
							if(err){
								db.close(),watchdog = function(){};
								return errCallback? errCallback(err): console.log(err);

							}else{
								'function' == typeof successCallback? successCallback(collection, function(err, doc){
									db.close(),watchdog = function(){};
									err? (errCallback? errCallback(err):console.log(err)):
										(nextCallback?nextCallback(doc):console.log(doc));
								}):
									// sample successCallback(collection, callback)
									collection.findOne({'name': 'apwan'}, function (err, doc) {
										db.close(),watchdog = function(){};
										console.log(err ? err : doc);
									});
							}
						});

				}else{
					//进行跨数据表级别的操作
					'function' == successCallback? successCallback(db, function(err,result, completed){
						if(err){
							if(completed) {db.close(), watchdog = function(){};}
							'function' == errCallback? errCallback(err): console.log(err);
						}else{
							if(completed) {db.close(), watchdog = function(){};}
							'function' == nextCallback? nextCallback(result): console.log(result);
						}


					}): (db.close(), watchdog = function(){}, console.log('callback function not provided!!'));
				}
				return setTimeout(function(){
					watchdog();
				}, 8*1000);


			}
		});


	});

};


/**
 * For module exports
 * @type {{database: null, auth: null,
 * init: Function, createCollections: Function, clearCollections: Function,
 * saveUploadFile: Function, login: Function, signup: Function,
 * getSlideInfo: Function, getSlideList: Function, getSlideContent: Function, saveSlideInfo: Function, saveSlide: Function, deleteSlide: Function,
 * test: Function}}
 */
var dbController = {
	database: null,
	auth: null,

    // initialize database module for exports
	init: function(){
		if(!this.database || !this.database){
			(this.database = database),
			(this.auth = auth);
		}
	},

	/**
	 * 初始化数据库，创建表
	 * @param db
	 * @param resCallback
	 * @returns {*}
	 */
	createCollections: function(names, resCallback){
		if('string' == typeof names) names = [names];
		auth(names, function(db, item, callback){
			db.createCollection(item, callback);
		}, function(errmsg, resmsg){
			resCallback(errmsg, resmsg);
		});
    },
	/**
	 * 清理数据库
	 * @param names
	 * @param resCallback
	 */
	clearCollections: function(names, resCallback){
		if('string' == typeof names) names = [names];
		auth(names, function(db, item, callback){
			db.dropCollection(item, callback);
		}, function(errmsg, resmsg){
			resCallback(errmsg, resmsg);
	    });
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
			receive: 1,
			success: 0
		};
		var checkUser = {
			name: req.body['username'],
			password: req.body['password']
		};
		//res.send(JSON.stringify(user));
		auth(collections.users, function(collection, callback){
			collection.findOne(checkUser, callback);//一次查询，无进一步操作；
		}, function(userT){
			if(userT){
				console.log('user pass:', userT);
				req.session.user = userT;
				reJson.success = 1;
				//res.send(JSON.stringify(erJson));
				res.redirect('user/space');
			}else{
				reJson.errmsg = '用户不存在或密码不符';
				res.send(JSON.stringify(reJson));

			}

		}, function(err){
			req.session.user = null;
			reJson.success = 0;
			reJson.errmsg = err;
            res.send(JSON.stringify(reJson));
		});

	},
	signUp: function(req, res){
		var reJson = {
			receive: 1,
			success: 0
		};
		var newUser = {
			name: req.body['username'],
			email: req.body['email'],
			password: req.body['password']
		};
		auth(collections.users, function(collection,callback){
			collection.findOne({name:req.body['username']}, function(err, doc){
				if(err){
					return callback(err, doc);
				}else if(doc){
					var errmsg = '用户已存在';
					return callback(errmsg, null);
				}else{// doc == null
					collection.insert(newUser, {safe: true}, function(err, userT){
						return callback(err, userT);
					});
				}

			});
		}, function(userT){
			reJson.success = 1;
			//res.send(JSON.stringify(reJson));
			res.render('login', {receive: 1, name: userT.name, password: userT.password});

		}, function(err){
			reJson.errmsg = err;
			res.send(JSON.stringify(reJson));
		});

	},

	getSlideInfo: function(sid, resCallback){
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


	},

	getSlideList: function(uid, callback){
		auth(collections.slides, function(collection, callback){
			collection.find({creator: uid, active: 1}).toArray(callback);
		}, function(docs){
			callback(null, docs);
		}, function(err){
			callback(err, null);
		});

    },
	getSlideContent: function(sid, rescallback){
		auth(collections.slides_contents, function(collection, callback){
			collection.findOne({_id: new ObjectID(sid)}, callback);
		}, function(doc){
			return rescallback(null, doc.data);

		}, function(err){
			return rescallback(err, null);
		});

	},
	createSlide: function(slide, resCallback){
		auth(collections.slides, function(collection, callback){
			collection.insert(slide, {safe: true}, callback);
		}, function(slideT){//TODO:
			if('object' == typeof slideT) slideT = slideT[0];
			var dir = './public/html/' + (slideT && slideT._id || 'null');
			fs.writeFile(dir, '<section><section><p>Welcome!</p></section></section>', function(err){
				return resCallback(err);
			});

		}, function(err){
			return resCallback(err);
		});
	},

	saveSlideInfo: function (sid, resCallback){
		auth(collections.slides, function(collection, callback){

		}, function(doc){

		}, function(err){

		});
	},

	saveSlide: function(req, res){
		//console.log(req.body["deck[data]"]);
		var slide_id = req.params[0];
		var slide_data = req.body["deck[data]"]||'';
		console.log(slide_id);
		this.auth(collections.slides_contents, function(collection,callback){
			collection.update({_id:new ObjectId(slide_id)},{$set:{data:slide_data}},{safe:true}, callback);
		}, function(doc){
			console.log(doc);
		});

		res.send('ok');
	},

	deleteSlide: function (sid, resCallback){
		auth(collections.slides, function(collection, callback){
			collection.update({_id: new ObjectID(sid), active: 1}, {$set:{active: 0}},{safe:true}, callback);
		}, function(result){
			return resCallback(null, result);
		}, function(err){
			return resCallback(err, null);
		});

	},


	test: function(){
		return 'ok';
	}

};



module.exports = (function(){
	return dbController.init(), dbController;
}());

console.log('Database Module Loading Successful!');