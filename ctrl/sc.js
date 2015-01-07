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
    showArray: {},


	/**
	 *
	 * @param newIO
	 */
	setIO: function (newIO) {
		io = newIO;
	},

	/**
	 * 向房间广播某个消息
	 * @param {string} roomId - id of the room
	 * @param {string} sig - signal to be broadcasted
	 */
	broadcastToRoom: function(roomId, sig) {
		io.to(roomId).emit(sig);
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
    			if (!(presId in sc.showArray)) {
    				sc.showArray[presId] = {};
    				sc.showArray[presId].numUsers = 0;
    				sc.showArray[presId].usernameArr = {};
    			}
    			sc.showArray[presId].usernameArr[socket.username] = (new Date()).getTime();
    			++sc.showArray[presId].numUsers;
    			
    			socket.emit('login', {
    				numUsers: sc.showArray[presId].numUsers
    			});
    			// 广播当前聊天室新成员加入
    			io.to(data.presId).emit('user joined', {
    				username: socket.username,
    				numUsers: sc.showArray[presId].numUsers
    			});
    		}
    	});

    	// 用户退出展示房间
   		socket.on('disconnect', function() {
   			if (addedUser && sc.showArray[presId].usernameArr[socket.username]) {
   				// 删除此用户
   				delete sc.showArray[presId].usernameArr[socket.username];
   				-- sc.showArray[presId].numUsers;
				if (sc.showArray[presId].numUsers == 0) {
					delete sc.showArray[presId];
				}

   				// 广播当前聊天室成员退出
   				io.to(presId).emit('user left', {
   					username: socket.username,
   					numUsers: sc.showArray[presId].numUsers
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


    }
}

module.exports = sc;