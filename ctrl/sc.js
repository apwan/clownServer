/**
 * Created by Wu Yijie on 12/26/14.
 */

var presstate = require('./presstate');
var url = require('url');
/** 
 * socket control namespace
 * @namespace sc 
 */
var sc = {

    io: null,
    test: function(){
        return 'socket testing';
    },

    /**
     * 存储每个房间当前用户
     */
    showArray : {},

	/**
	 *
	 * @param newIO
	 */
	setIO: function (newIO) {
		io = newIO;
	},


    /**
     * 客户端与服务器建立socket长连接时调用
     * @param socket - 与客户端连接的socket
     */
    onConnection: function (socket) {
    	console.log('socket connect');
    	var addedUser = false;
    	var presId = null;


    	// 加入展示房间
    	socket.on('slide watch', function(data) {
    		if (data.presId) {
				var showArray = this.showArray;
    			// 设置变量
    			socket.username = data.username;
    			presId = data.presId;
    			addedUser = true;
    			// 加入展示房间
    			socket.join(presId);
    			// 第一次同步
    			socket.emit('slide change');
    			// 加入聊天室
    			if (!(presId in showArray)) {
    				showArray[presId] = {};
    				showArray[presId].numUsers = 0;
    				showArray[presId].usernameArr = {};
    				showArray[presId].active = true;
    			}
    			showArray[presId].usernameArr[socket.username] = (new Date()).getTime();
    			++showArray[presId].numUsers;
    			
    			socket.emit('login', {
    				numUsers: showArray[presId].numUsers
    			});
    			// 广播当前聊天室新成员加入
    			io.to(data.presId).emit('user joined', {
    				username: socket.username,
    				numUsers: showArray[presId].numUsers
    			});
    		}
    	});

    	// 用户退出展示房间
   		socket.on('disconnect', function() {
   			if (addedUser) {
				var showArray = this.showArray;
   				// 删除此用户
   				delete showArray[presId].usernameArray[socket.username];
   				-- showArray[presId].numUsers;
				if (showArray[presId].numUsers == 0 && !showArray[presId].active) {
					delete showArray[presId];
				}

   				// 广播当前聊天室成员退出
   				io.to(presId).emit('user left', {
   					username: socket.username,
   					numUsers: showArray[presId].numUsers
   				})
   			}
   		});

   		// 聊天
   		socket.on('new message', function(data) {
   			io.to(presId).emit('new message', {
   				username: socket.username,
   				message: data
   			});
   		});

   		// 结束展示(展示者的socket发来end show)
   		socket.on('end show', function() {
   			this.showArray[presId].active = false;
   		});
    },
	/**
	 * 展示者通过post一个url, 开始一个展示
	 * 生成一个链接用以观看展示
	 * @param req - post request
	 * @param res - post result
	 */
	slideShow: function (req, res) {
		console.log('slide show post recv');
		if (req.body.command == 'start') {
			var now = (new Date()).getTime();
			// 新建展示
			presstate.createPresState({
				'slideId': req.body.slideId,
				'startTime': now,
				'lastChangeTime': now,
				'state': {}
			}, function (err, presId) {
				if (err && !presId) {
					console.log('error when creating presentation state');
					return res.send(JSON.stringify({
						success: 0
					}));
				}
				var urlParts = {
					'protocol': 'http',
					'host': 'localhost:3000',
					'pathname': '/ajax/slide-watch',
					'query': {
						'presId': presId
					}
				};

				return res.send(JSON.stringify({
					success: 1,
					presId: presId,
					watchUrl: url.format(urlParts)

				}));
			});
		}
		else if (req.body.command == 'end') {
			// broadcast to this show room
			io.to(req.body.presId).emit('show end');
			presstate.deletePresStateById(req.body.presId, function (err, data) {
				if (err) {
					console.log('erorr when deleting presentation state');
				}
			});
		}
	},
	/**
	 * 展示者切换slides
	 * @param {Object} req - 字段为presId, newState
	 * @param {Object} res - 字段为success, errStr或者data
	 */
	slideChange: function(req, res) {
		console.log('slide change recv');
		presstate.getPresStateById(req.body.presId, function (err, data) {
			if (err) {
				console.log('error when getting presentation state ' + req.body.presId);
				res.send(JSON.stringify({
					success: 0,
					errStr: '数据库端错误'
				}));
			}
			else if (!data) {
				console.log('no active presentation state found ' + req.body.presId);
				res.send(JSON.stringify({
					success: 0,
					errStr: '不存在当前展示'
				}));
			}
			else {
				presstate.updatePresStateById(req.body.presId, {
					'slideId': data.slideId,
					'startTime': data.startTime,
					'lastChangeTime': (new Date()).getTime(),
					'state': req.body.newState
				}, function (err, data) {
					if (err) {
						console.log('error when updating presentation state');
					}
					else {
						// 广播切换slides信息
						io.to(req.body.presId).emit('slide change');
						res.send(JSON.stringify({
							success: 1,
							data: data
						}));
					}
				});
			}
		});
	},
	/**
	 * 通过Get特定url, 用户开始观看某个展示, 具体加入房间在socket里处理
	 * 具体得到slides内容由用户再次ajax方式get
	 * @param req - get request
	 * @param res - get result
	 */
	slideWatch: function (req, res) {
		console.log('slide watch recv');
		var query = url.parse(req.url, true).query;
		var username;
		if(req.session.user){
			username = req.session.user.name;
		}else{
			//Handle error
			return res.send('Invalid Session!');
		}

		function renderOrSend(resObj) {
			res.format({
				'text/html': function () {
					//跳转方式
					res.render('watching', resObj);
				},
				'application/json': function () {
					// ajax方式
					res.send(JSON.stringify(resObj));
				}
			})
		}

		presstate.getPresStateById(query.presId, function (err, data) {
			if (err) {
				console.log('error when getting presentation state ' + req.body.presId);
				renderOrSend({
					success: 0,
					errStr: '数据库端错误',
					username: username
				});
			}
			else if (!data) {
				console.log('no active presentation state found ' + req.body.presId);
				renderOrSend({
					success: 0,
					errStr: '不存在当前展示',
					username: username
				});
			}
			else {
				renderOrSend({
					success: 1,
					username: username
				});
			}
		});
	}



};


module.exports = sc;

console.log('Socket Module Loading Successful!');