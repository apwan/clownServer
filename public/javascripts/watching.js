$(function() {
	// jQuery获取组件名字


	var socket = io(); //创建socket
	//socket.emit('slide watch', {'showId': });

	/**
	 * 此展示对应的json文件
	 * @name jsonUrl
	 * @type {string}
	 */
	var jsonUrl = null;

	/**
	 * 标志是否连接到聊天室
	 * @name connected
	 * @type {boolean}
	 */
	var connected = false;


	/**
	 * socket接收到'slide change'时, Ajax获取最新json文件
	 * 解析并切换客户端slides
	 * @function
	 * @name onSlideChange
	 * @todo 客户端解析json文件切换slides
	 */
	socket.on('slide change', function(jUrl) {
		// 第一次slide change会告知客户端此展示的json url
		if (jUrl) {
			jsonUrl = jUrl;
		}
		if (jsonUrl) {
			getShowState(jsonUrl, function(response) {

			});
		}
	});

	/**
	 * socket接收到'show end'时, 通知用户展示已结束	
	 * @function
	 * @name onShowEnd
	 * @todo 还啥都没写
	 */
	socket.on('show end', function() {

	});

	/**
	 * socket接收到'login'时, 通知用户已加入聊天室	
	 * @function
	 * @name onLogin
	 * @todo 展示欢迎信息
	 */
	socket.on('login', function(data) {
		connected = true;
		var message = "Welcome toe the chat room!";

	});

	/**
	 * socket接收到'show end'时, 通知用户展示已结束	
	 * @function
	 * @name onShowEnd
	 * @todo 前端前端！
	 */
	socket.on('new message', function(data) {
		addChatMessage(data.username, data.message);
	});

	/**
	 * socket接收到'user joined'时, 通知其他用户某用户已加入	
	 * @function
	 * @name onUserJoined
	 * @todo 前端前端！
	 */
	socket.on('user joined', function(data) {
		message = data.username + " join the chat room.";
	});

	/**
	 * socket接收到'user left'时, 通知其他用户某用户已退出	
	 * @function
	 * @name onUserLeft
	 * @todo 前端前端！
	 */
	socket.on('user left', function(data) {
		message = data.username + " left the chat room.";
	});

	/**
	 * 将特定用户的发言显示进聊天区
	 * @name addChatMessage
	 * @function
	 * @param {string} username - 发言用户名
	 * @param {string} message - 发言内容
	 * @todo 啥都没写
	 */
	function addChatMessage(username, message) {

	};
});