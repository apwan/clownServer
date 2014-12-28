$(function() {
	// jQuery获取组件名字

	var socket = io(); //创建socket

	/**
	 * 标志是否连接到聊天室
	 * @type {boolean}
	 */
	var connected = false;


	/**
	 * @function
	 * @name onSlideChange
	 * socket接收到'slide change'时, Ajax获取最新json文件
	 */
	socket.on('slide change', function() {
		request = createRequest();
		/**
		 * @name onReadStateChange
		 * @function
		 * @todo 客户端解析json文件切换slides
		 */
		request.onreadstatechange = function() {
			if (request.readyState == 4 && request.status == 200) {

			}
		};
		request.open("GET", jsonUrl, true);
		request.send(null);
	});

	/**
	 * @function
	 * @name onShowEnd
	 * socket接收到'show end'时, 通知用户展示已结束
	 * @todo 还啥都没写
	 */
	socket.on('show end', function() {

	});

	/**
	 * @function
	 * @name onLogin
	 * socket接收到'login'时, 通知用户已加入聊天室
	 * @todo 展示欢迎信息
	 */
	socket.on('login', function(data) {
		connected = true;
		var message = "Welcome toe the chat room!";

	});

	/**
	 * @function
	 * @name onShowEnd
	 * socket接收到'show end'时, 通知用户展示已结束
	 * @todo 前端前端！
	 */
	socket.on('new message', function(data) {
		
	});
});