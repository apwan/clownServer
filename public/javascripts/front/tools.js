/**
 * Created by WuYijie on 12/28/14.
 */


function ajax_include(src,id){
    $.ajax({
        type: "GET",
        url: src,

        dataType: "html",
        success: function(data){
            var ul = document.getElementById(id);
            ul.innerHTML = data;
        }
    });
}
