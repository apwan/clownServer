/**
 * Created by WuYijie on 12/28/14.
 */


function ajax_include(src,id,ahead,append){
    $.ajax({
        type: "GET",
        url: src,

        dataType: "html",
        success: function(data){
            var ul = document.getElementById(id);
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
        cfg:'/cfg', data:'/data', save:'/save',
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

