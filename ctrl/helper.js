/**
 * Created by WuYijie on 1/12/15.
 */

var HELPER = {
    acknowledgement: function(){
        return {
            'async': 'using eachSeries for series control flow'

        }
    },
    examples: function(funcName){
      switch(funcName){
          case 'eachSeries':
              return function(){
                  this.eachSeries && this.eachSeries([],function(item, callback){
                      // do something to test
                      callback();
                  }, function(err){
                      if(err)
                          console.log(err);
                  });
              };
      }
    },
    init: function(){
        null;//currently

    }
};

// excerpt from https://github.com/caolan/async
HELPER.eachSeries = function (arr, iterator, callback) {
    callback = callback || function () {};
    if (!arr.length) {
        return callback();
    }
    var completed = 0;
    var iterate = function () {
        iterator(arr[completed], function (err) {
            if (err) {
                callback(err);
                callback = function () {};
            }
            else {
                completed += 1;
                if (completed >= arr.length) {
                    callback();
                }
                else {
                    iterate();
                }
            }
        });
    };
    iterate();
};

HELPER.newID = function(){
    var t_stamp = new Date().getTime()/1000%3600;
    var rnd_stamp = Math.random()*1000;
    return Math.floor(t_stamp)*1000 + Math.floor(rnd_stamp);
};

module.exports = (function(){
    return HELPER.init(), HELPER;
}());