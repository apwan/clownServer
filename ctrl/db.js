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
var help = require('./helper');
// END of dependency



var ObjectID = mongodb.ObjectID;
// create mongodb server
var server = new mongodb.Server(settings.db.host, settings.db.port,
	{auto_reconnect: false});
// initialize database instance
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
		db.authenticate(settings.db.user, settings.db.pwd, function (err, result) {
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
				if('object' == typeof collectionName) {
				// parallel operation among several collections
					if(!collectionName.length){// change object to array
						var tmp = [];
						for(var i in collectionName){
							tmp[tmp.length] = collectionName[i];
						}
						console.log(tmp);
						collectionName = tmp;
					}
					var not_completed = collectionName.length;
					var errmsg = '';
					var resmsg = '';
					for(var i in collectionName){
						successCallback(db, collectionName[i], function(err, result){
							--not_completed;
							if(err){
								errmsg += err+';';
							}else{
								//console.log(result);
								var r = ('object'==typeof result? '[object]': result);
								resmsg += r+';';
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
	init: function() {
		if (this.database) return;

		(this.database = database),
			(this.auth = auth);
		var createCollections = this.createCollections;
		// 提供管理员密码时进行初始化
		settings.db.sudo && database.open(function (err, db) {
			if (err) {
				return console.log(err);
			}
			;
			db.authenticate(settings.db.admin, settings.db.sudo, function (err, result) {
				if (err) {
					db.close();
					return console.log('auth failed', err);
				} else {

					db.addUser(settings.db.user, settings.db.pwd, {readOnly: false}, function (err, res) {
						db.close();
						if (err) {
							console.log('auth', err);
						} else {
							createCollections(function (err, res) {
								console.log(err, res);
							});
						}
					});

				}
			})
		});
		var clearCollections = this.clearCollections;
		settings.db.sudo && process.on('exit', function(){
			clearCollections();
			console.log('exit callback');
			// others
		});

		this.testHelper();

	},

	/**
	 * 初始化数据库，创建表
	 * @param db
	 * @param resCallback
	 * @returns {*}
	 */
	createCollections: function(names, resCallback){
		if('string' == typeof names){
			names = [names];
		}
		if('function' == typeof names){
			resCallback = names,
				names = settings.collections;
		}
		auth(names, function(db, item, callback){
			db.createCollection(item, callback);
		}, function(errmsg, resmsg){
			resCallback? resCallback(errmsg, resmsg): console.log(errmsg, resmsg);
		});
    },
	/**
	 * 清理数据库
	 * @param names
	 * @param resCallback
	 */
	clearCollections: function(names, resCallback){
		if('string' == typeof names) names = [names];
		if('function' == typeof names){
			resCallback = names,
			names = settings.collections;
		}
		auth(names, function(db, item, callback){
			db.dropCollection(item, callback);
		}, function(errmsg, resmsg){
			resCallback? resCallback(errmsg, resmsg): console.log(errmsg, resmsg);
	    });
    },


	/**
	 *  测试HELPER class
	 */

	testHelper: function(){
		console.log('==== start testing helper ====');
		console.log('obj',new ObjectID());
		console.log('help', help.newID());

		console.log('==== end testing helper ====');
	},



	/**
	 * 保存slide编辑时上传的图片
	 * @param req
	 * @param res
	 * @param storename
	 */
	saveUploadFile: function (req, res, storename) {
		var form = formidable.IncomingForm();
		form.uploadDir = 'public/images/';
		form.keepExtensions = true;
		form.maxFieldsSize = 2 * 1024 * 1024;

		console.log('new formidable');


				//return res.redirect('/');

		form.
			on('progress', function (byteReceived, byteExpected) {

			}).
			on('field', function (name, value) {
				//console.log(name, value);

			}).
			on('fileBegin', function (name, file) {
				console.log('new file');
				var extName = '';  //后缀名
				switch (file.type) {
					case 'image/pjpeg':
						extName = '.jpg';
						break;
					case 'image/jpeg':
						extName = '.jpg';
						break;
					case 'image/png':
						extName = '.png';
						break;
					case 'image/gif':
						extName = '.gif';
						break;
				}
				console.log('ext',extName);

				var newPath = 'public/images/'+storename;
				file.path = newPath;


				console.log('filepath:', file.path);


			}).
			on('file', function (name, file) {

			}).
			on('err', function (err) {

			});
		form.parse(req);


	},


	/**
	 * 用户登陆验证
	 * @param checkUser
	 * @param resCallback
	 */
	login: function(checkUser, resCallback){

		//res.send(JSON.stringify(user));
		auth(collections.users, function(collection, callback){
			collection.findOne(checkUser, callback);//一次查询，无进一步操作；
		}, function(userT){
			return userT? resCallback(null, userT): resCallback('not exist', null);

		}, function(err){
			return resCallback(err, null);

		});

	},

	/**
	 * 用户注册
	 * @param req
	 * @param res
	 */
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

	/**
	 * 获取slide信息
	 * @param sid
	 * @param resCallback
	 */
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

	/**
	 * 获取用户slide列表
	 * @param uid
	 * @param resCallback
	 */
	getSlideList: function(uid, resCallback){
		auth(collections.slides, function(collection, callback){
			collection.find({creator: uid}).toArray(function(err, items){
				return callback(err,items);
			});
		}, function(docs){
			resCallback(null, docs);
		}, function(err){
			resCallback(err, null);
		});

    },

	/**
	 * 获取用户slide内容
	 * @param sid
	 * @param resCallback
	 */
	getSlideContent: function(sid, resCallback){
		auth(collections.slides_contents, function(collection, callback){
			collection.findOne({_id: new ObjectID(sid)}, callback);
		}, function(doc){
			return doc? resCallback(null, doc.data): resCallback('not exist', doc);

		}, function(err){
			return resCallback(err, null);
		});

	},

	/**
	 * 创建slide
	 * @param slide
	 * @param resCallback
	 */
	createSlide: function(slide, resCallback){
		auth(collections.slides, function(collection, callback){
			collection.insert(slide, {safe: true}, callback);
		}, function(slideT){//TODO:
			var sl = slideT.lenght? slideT[0] : slideT;
			auth(collections.slides_contents, function(collection, callback){
				collection.insert({_id: new ObjectID(sl._id), data:'<section><section><p>Welcome!</p></section></section>'},
					{safe: true}, function(err, doc){
						return err? callback(err, doc):callback(null, sl)
					});
			}, function(doc){
				return resCallback(null, doc);
			}, function(err){
				return resCallback(err, null);
			});
		}, function(err){
			return resCallback(err);
		});
	},

	/**
	 * 保存slide信息
	 * @param sid
	 * @param resCallback
	 */
	saveSlideInfo: function (sid, resCallback){
		auth(collections.slides, function(collection, callback){


		}, function(doc){

		}, function(err){

		});
	},


	/**
	 * 保存slide内容
	 * @param req
	 * @param res
	 */
	saveSlide: function(req, res){
		//console.log(req.body["deck[data]"]);
		var slide_id = req.query.arg;
		var slide_data = req.body["deck[data]"]||'';
		console.log('save slide contents', slide_id);
		this.auth(collections.slides_contents, function(collection,callback){
			collection.save({_id:new ObjectID(slide_id), data:slide_data},{safe:true}, function(err, result){
				if(err){
					console.log(err), callback(err, null);
				}else{
					callback(null, result);
				}
			});
		}, function(doc){
			console.log('res', doc);
		}, function(err){
			console.log(err);
		});

		res.send('ok');
	},


	/**
	 * 删除slide
	 * @param sid
	 * @param resCallback
	 */
	deleteSlide: function (sid, resCallback){
		auth(collections.slides, function(collection, callback){
			collection.update({_id: new ObjectID(sid), active: 1}, {$set:{active: 0}},{safe:true}, callback);
		}, function(result){
			return resCallback(null, result);
		}, function(err){
			return resCallback(err, null);
		});

	},



	/**
	 * 数据库测试
	 * @returns {string}
	 */
	test: function(){
		return 'ok';
		// add other codes for testing
	}

};



module.exports = (function(){
	return dbController.init(), dbController;
}());

console.log('Database Module Loading Successful!');
