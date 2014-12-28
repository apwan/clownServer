/**
 * Created by Wu Yijie on 12/26/14.
 */

/** 
 * socket control namespace
 * @namespace sc 
 */
var sc = {


    version: '0.0.0',
    test: function(){
        return 'socket' + this.version;
    },

    /** 结构体数组,每个结构体代表一个展示进程
     * @type {Object.<string, Object>}
     */
    showArray: {},

	/**
	 * 展示者通过post一个url, 开始或结束一个展示
	 * 生成一个链接用以观看展示
	 * @param req - post request
	 * @param res - post result
	 * @todo 将信息存入数据库,而不是内存是不是更好?
	 */
	slideShow: function (req, res) {
		console.log('slide show post recv');
		if (req.body.command == 'start') {
			var now = new Date();
			// todo: 在数据库里查找此slides的信息，确认原始的showIndex有效
			var showId = req.body.showIndex + '_' + now.getTime();
			var md5 = crypto.createHash('md5');
			var passwd = md5.update(req.body.passwd).digest('base64');
			var jsonFileName = __dirname + '/public/showJsonFiles/' + showId + '.json';
			var jsonUrl = '/showJsonFiles/' + showId + '.json';
			fs.exists(jsonFileName, function(exists) {
				if (exists) {
					console.log('show json file already exist');
					req.flash('error', err);
					return res.redirect('/');
				}
				var initJson = {
					someinfo: 'someinfo',
					state: JSON.parse(req.body.state)
				};
				console.log('reqbody.state:' + req.body.state);
				//console.log(initJson);
				fs.writeFile(jsonFileName, JSON.stringify(initJson, null, 4), function(err){
					if (err) {
						console.log('error when writing json file:' + err);
						return res.redirect('/');
					}
					showArray[showId] = {};
					showArray[showId].jsonFile = jsonFileName;
					showArray[showId].passwd = passwd;
					showArray[showId].jsonUrl = jsonUrl;
					urlParts = {
						'protocol': 'http',
						'host': 'localhost:3000',
						'pathname': '/slide-watch/',
						'query': {
							'showId': showId,
							'passwd': passwd
						}
					};
					res.render('showing', { 'showId': showId, 'passwd': passwd, 'url': url.format(urlParts), 'jsonUrl': jsonUrl});

					//return res.redirect('/slide-show/');
				});
			});
		}
		else if (req.body.command == 'end' && (req.body.showId in showArray) && 
					(req.body.passwd == showArray[req.body.showId].passwd)) {
			// broadcast to this show room
			io.to(req.body.showId).emit('show end');
			fs.unlink(showArray[req.body.showId].jsonFile, function(err){
				if (err)
					console.log('error in delete json file');
				else
					console.log('succussfully delete json file');
				delete showArray[req.body.showId];
				return res.redirect('/');
			});
		}
	},

	/**
	 * 展示者通过Post特定url, 切换slides
	 * @param req - post request
	 * @param res - post result
	 */
	slideChange: function (req, res) {
		console.log('slide change recv');
		var reqBody = req.body;
		if (reqBody.showId in showArray && reqBody.passwd == showArray[reqBody.showId].passwd) {
			changeJsonFile(showArray[reqBody.showId].jsonFile, reqBody.state, function(err) {
				// 广播切换slides信息
				if (!err) {
					io.to(reqBody.showId).emit('slide change');
					console.log('slide-change:' + JSON.stringify(reqBody.state));
					res.end(JSON.stringify(reqBody.state)); // 回发新的state
				}
			});	
		}
	},

	/**
	 * 通过Get特定url, 用户开始观看某个展示
	 * @param req - get request
	 * @param res - get result
	 */
	slideWatch: function (req, res) {
		console.log('slide watch recv');
		var query = url.parse(req.url, true).query;
		if (!(query.showId in showArray)) {
			// 当前不存在此展示
			return res.redirect('/');
		}
		if (typeof(query.passwd)!='undefined' &&
			query.passwd != showArray[query.showId]['passwd']) {
			// 密码错误
			return res.redirect('/');
		}
		res.render('watching', { 'showId': query.showId, 'passwd': query.passwd, 'jsonUrl': showArray[query.showId].jsonUrl });
	},


    /**
     * 客户端与服务器建立socket长连接时调用
     * @param socket - 与客户端连接的socket
     */
    onConnection: function (socket) {
    	console.log('socket connect');
    	var addedUser = false;
    	var showId = null;

    	// 加入展示房间
    	socket.on('slide watch', function(data) {
    		if (data.showId in showArray) {
    			// 设置变量
    			socket.username = data.username;
    			showId = data.showId;
    			addedUser = true;
    			// 加入展示房间
    			socket.join(showId);
    			// 第一次同步
    			socket.emit('slide change');
    			// 加入聊天室
    			++showArray[showId].numUsers;
    			showArray[showId].usernameArray[username] = username;
    			socket.emit('login', {
    				numUsers: showArray[showId].numUsers
    			});
    			// 广播当前聊天室新成员加入
    			io.to(data.showId).emit('user joined', {
    				username: socket.username,
    				numUsers: showArray[showId].numUsers
    			});
    		}
    	});

    	// 用户退出展示房间
   		socket.on('disconnect', function() {
   			if (addedUser) {
   				delete showArray[showId].usernameArray[socket.username];
   				-- showArray[showId].numUsers;

   				// 广播当前聊天室成员退出
   				io.to(showId).emit('user left', {
   					username: socket.username,
   					numUsers: showArray[showId].numUsers
   				})
   			}
   		});

   		// 聊天
   		socket.on('new message', function(data) {
   			io.to(showId).emit('new message', {
   				username: socket.username,
   				message: data
   			});
   		});
    }
    
}

exports.sc = sc;