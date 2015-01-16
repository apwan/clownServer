/**
 * Created by WuYijie on 12/28/14.
 */


function ajax_include(src,id,ahead,append){
    $.ajax({
        type: "GET",
        url: src,

        dataType: "html",
        success: function(data){
            var ul = 'object' == typeof id? id : document.getElementById(id);
            if(append && ahead) {
                ul.innerHTML = ahead + data + append;
            }else{
                ul.innerHTML = data;
            }
        }
    });
}

/* The above part has been tested  */


// mapping the state of the user and slide to ajax urls
// not finished
function stateUrlMap(mode, op){
    var tmp = '';
    switch(mode){
        case 'none':

            break;
        default:
            break;
    }
    return tmp;
};

// dynamic loaing contents
var ajax_loader = {
    mode: 'none',
    op: 'none',
    base: '/ajax',
    urls: {
        cfg:'/cfg', data:'/deck-data', save:'/save',
        view:'/slide-watch', pres:'/slide-change', prof:'/prof'
    },
    init: function(base, urls){
        this.base = base;
        this.urls = urls;
    },
    update: function(mode, op){
        this.mode=mode;
        this.op=op;
    },
    exec: function(method, params){
        var ajax_pre = stateUrlMap(mode, op);

        $.ajax({
            type: method,
            url: ajax_pre + params,
            dataType: 'text',
            success: function(data){
                // TODO: change the html
            }

        });
    },
    info: function(){
        return {mode:this.mode, op:this.op};
    }
};




/**
 * Create a Ajax request
 */
function createRequest() {
    try {
        request = new XMLHttpRequest();
    } catch (tryMS) {
        try {
            request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (otherMS) {
            try {
                request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (failed) {
                request = null;
            }
        }
    }
    return request;
}

/**
 * @callback onGetShowStateCallback
 * @param {string} responseText - Get到的response字符串
 */

/**
 * Ajax获取最新json文件
 * @param {onGetShowStateCallback} callback - 处理得到的json文件的回调函数
 */
function getShowState(jsonUrl, callback) {
    request = createRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            callback(request.responseText);
        }
    };
    request.open("GET", jsonUrl, true);
    request.send(null);
}

/**
 * 用hidden form实现的同步Post
 * @param {string} path - post路径
 * @param {Object} params - post要求体
 */
function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}


function activeShow() {
    console.log($(this).parent().attr('aria-label'));
    var slideId = $(this).parent().attr('aria-label');
    var params = {
        'slideId': slideId,
        'command': 'start'
    };
    post('/pres/slide-show/', params);
};




/**
 * 发送编辑幻灯片的post请求
 */
function activeModify() {
    console.log($(this).parent().attr('aria-label'));
    var slideId = $(this).parent().attr('aria-label');
    var slideurl = ['/?user=',SLConfig.username,'&slide=',$(".btn-toolbar[index=0]").attr("aria-label")].join('');
    //console.log(slideurl);
    window.open(slideurl,'blank');

};



/**
 * 发送删除幻灯片的AJAX GET请求
 */
function activeDelete() {
    var listItem = $(this).parent().parent();
    var slideId = $(this).parent().attr('aria-label');
    console.log(slideId);

    $.ajax({
        type:'GET',
        url:'/ajax?op=delete',
        dataType:'text',
        data:{
            'slideId': slideId
        },
        success: function(data){
            data = JSON.parse(data);
            if (data.success == 0) {
                // 展示错误信息
                alert('删除幻灯片失败');
            }
            else {
                // 删除这个列表项
                listItem.remove();
            }
        }
    });

};


/**
 * 新建一个幻灯片的AJAX POST请求
 */
function createNewSlide() {
    var newSlideName = $('.newSlideName').val();

    if (newSlideName) {
        $.post('/ajax?op=create', {
            name: newSlideName
        }, function(data) {
            data = JSON.parse(data);
            console.log(data);
            if (data.success == 0) {
                alert('新建幻灯片失败');
            }
            else {

                console.log(newSlideName);
                console.log(data.name);
                console.log(data._id);
                $('.createNew').before(['<div class="li list-group-item">',
                '<h3>' ,newSlideName , '</h3>' ,
                '<div  class="btn-toolbar pull-right" role="toolbar" aria-label=',data._id,
                '><button type="button" class="btn btn-default showBtn"> 展示</button>',
                '<button type="button" class="btn btn-default modifyBtn"> 修改</button>',
                '<button type="button" class="btn btn-default deleteBtn"> 删除</button></btn-toolbar></li>'].join('')),
                bindClick();


            }
        });
    }
};

function startWatch() {
    var presId = $presIdInput.val();
    $.get('/ajax?op=view', {
        presId: presId
    }, function (data) {
        if (data.success == 0) {
            // 展示错误信息
            alert(data.errStr);
        }
        else {
            UserWatchObj.presId = presId;
            UserWatchObj.username = data.username;
            $.get('/ajax?op=view', {
                presId: presId,
                command: 'contents'
            }, function (data) {
                if (data.success == 0) {
                    //展示错误信息
                    alert(data.errStr);
                }
                else {
                    // 动态的设置contents
                    $('.showArea').prepend(data.contents);
                    Reveal.initialize(
                        {
                            controls: true,
                            progress: true,
                            history: false,
                            center: true,
                            slideNumber: true,

                            theme: Reveal.getQueryHash().theme, // available themes are in /css/theme
                            transition: Reveal.getQueryHash().transition || 'default'
                        });
                    //创建并设置socket
                    var socket = io();
                    setupSocket(socket);
                    socket.emit('slide watch', {'presId': UserWatchObj.presId,
                        'username': UserWatchObj.username
                    });

                }
            });
        }
    });
};

