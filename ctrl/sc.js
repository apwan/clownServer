/**
 * Created by Wu Yijie on 12/26/14.
 */

var presstate = require('./presstate');
/** 
 * socket control namespace
 * @namespace sc 
 */
var sc = {


    version: '0.0.0',
    test: function(){
        return 'socket' + this.version;
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
   			showArray[presId].active = false;
   		});
    }
}

module.exports = sc;