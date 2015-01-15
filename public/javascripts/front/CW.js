/**
 * Created by WuYijie on 1/15/15.
 */

// web UI controller

$(function(){
    function init(){
        var t = $('html');
        t.hasClass('clown-space')? bindSpace():
            t.hasClass('clown-edit')? bindEdit():
                t.hasClass('clown-watch')? bindWatch():
                    bindLogin();

    };
    function bindSpace(){


    };
    function bindEdit(){

    };
    function bindWatch(){

    };
    function bindLogin(){


    };
    setTimeout(init, 1);

    CW = window.CW || (CW = {}, clownController())
}());

function clownController(){
    var type = '';
    return {
        'type': type,
        // other objects
    }
};

