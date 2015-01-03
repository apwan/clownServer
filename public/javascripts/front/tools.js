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

