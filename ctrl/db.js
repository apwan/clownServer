/**
 * Created by Wu Yijie on 12/26/14.
 */


var db = {

    version: '0.0.0',
    test: function(){
        return 'database' + this.version;
    }
}

exports.db = db;