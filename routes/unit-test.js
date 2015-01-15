/**
 * Created by WuYijie on 1/15/15.
 */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('qunit-test', {});
});

module.exports = router;