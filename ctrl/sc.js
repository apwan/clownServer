/**
 * Created by Wu Yijie on 12/26/14.
 */

var presstate = require('./presstate');
var url = require('url');
var slidedb = require('./slide');
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



    },


  /**
   * 展示者通过post一个url, 开始一个展示
   * 生成一个链接用以观看展示
   * @param req - post request
   * @param res - post result
   */
  slideShow: function (req, res) {
     console.log('slide show post recv');
     reqBody = req.body;
     if (reqBody.command == 'start') {
        var now = (new Date()).getTime();
        // 新建展示
        slidedb.getContentById(reqBody.slideId, function(err, contents) {
           if (err || !contents) {
              return res.send({
                 success: 0,
                 errStr: '无法获取该slide'
              });
           }
           presstate.createPresState({'slideId': reqBody.slideId,
                                   'startTime': now,
                                   'lastChangeTime': now,
                                   'state': '{}'
                                   }, function (err, presId) {
              if (err && !presId) {
                 console.log('error when creating presentation state');
                 return res.send({
                    success: 0,
                    errStr: '创建新的展示失败'
                 });
              }
              var urlParts = {
                       'protocol': 'http',
                       'host': 'localhost:3000',
                       'pathname': '/ajax/slide-watch',
                       'query': {
                          'presId': presId.toString()
                          }
                       };

              return res.send({
                 success: 1,
                 presId: presId.toString(),
                 watchUrl: url.format(urlParts),
                 contents: contents
              });
           });
        });
     }
     else if (reqBody.command == 'end') {
        // broadcast to this show room
        sc.broadcastToRoom(reqBody.presId, 'show end');
        presstate.deletePresStateById(reqBody.presId, function (err, data) {
           if (err) {
              console.log('erorr when deleting presentation state');
           }
           res.end();
        });
     }
  },


  /**
   * 通过Ajax Get特定url, 用户开始观看某个展示, 具体加入房间在socket里处理
   * 具体得到slides内容由用户再次ajax方式get
   * @param req - get request
   * @param res - get result
   */
  slideWatch: function(req, res) {
      console.log('slide watch recv');
      //var presId = url.parse(req.url, true).query.presId；
      var presId = req.query.presId;
      // 从session中得到用户名
      //var username = req.session.user.name;
      var username = 'NingXuefei';
      var command = req.query.command;

      presstate.getPresStateById(presId, function (err, data) {
         if (err) {
            console.log('error when getting presentation state ' + reqBody.presId + ': ' + err);
            res.send({
               presId: presId,
               success: 0,
               errStr: '数据库端错误',
               username: username
            });
         }
         else if (!data) {
            console.log('no active presentation state found ' + reqBody.presId);
            res.send({
               presId: presId,
               success: 0,
               errStr: '不存在当前展示',
               username: username
            });
         }
         else {
            if (command == "contents") {
               // 获取内容
               slidedb.getContentById(data.slideId, function(err, contents) {
                  if (err || !contents) {
                     return res.send({
                        success: 0,
                        errStr: '获取内容失败'
                     });
                  }
                  res.send({
                     success: 1,
                     contents: contents
                  });
               });
            }
            else if (command == "newstate") {
               // 回发newstate
               res.send({
                  success: 1,
                  data: data
               });
            }
            else {
               res.send({
                  presId: presId,
                  success: 1,
                  username: username
               });
            }
         }
      });
  },


  /**
   * 展示者切换slides
   * @param {Object} req - 字段为presId, newState
   * @param {Object} res - 字段为success, errStr或者data
   */
  slideChange: function(req, res) {
     console.log('slide change recv');
     var reqBody = req.body;
     presstate.getPresStateById(reqBody.presId, function(err, data) {
        if (err) {
           console.log('error when getting presentation state ' + reqBody.presId);
           res.send({
              success: 0,
              errStr: '数据库端错误'
           });
        }
        else if (!data) {
           console.log('no active presentation state found ' + reqBody.presId);
           res.send({
              success: 0,
              errStr: '不存在当前展示'
           });
        }
        else {
           presstate.updatePresStateById(reqBody.presId, {
              'slideId': data.slideId,
              'startTime': data.startTime,
              'lastChangeTime': (new Date()).getTime(),
              'state': reqBody.newState
           }, function (err, data) {
              if (err) {
                 console.log('error when updating presentation state');
                 return res.send({
                    success: 0,
                    errStr: '更新展示状态失败'
                 });
              }
              else {
                 // 广播切换slides信息
                 console.log('成功更新展示状态');
                 sc.broadcastToRoom(reqBody.presId, 'slide change');
                 return res.send({
                    success: 1,
                    data: data
                 });
              }
           });
        }
     });
  }

}


module.exports = sc;

console.log('Socket Module Loading Successful!');
