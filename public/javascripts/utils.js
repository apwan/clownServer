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
