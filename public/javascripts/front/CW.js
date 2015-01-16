/**
 * Created by WuYijie on 1/15/15.
 */

// web UI controller

window.CW = function(t) { // GLOBAL: SL
    t = t.split(".");
    for (var e = CW; t.length; ) {
        var n = t.shift();
        e[n] || (e[n] = {}), e = e[n]
    }
    return e
},

$(function(){
        function init(){
            var t = $('html');
            t.hasClass('clown-space')? bindSpace():
                t.hasClass('clown-edit')? bindEdit():
                    t.hasClass('clown-watch')? bindWatch():
                        bindLogin();

        }
        function bindSpace(){

        }
        function bindEdit(){

        }
        function bindWatch(){

        }
        function bindLogin(){


        }
        setTimeout(init, 1);
}),


CW("controllers").loader = {

},

CW("controllers").render = {

};


