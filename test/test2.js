/**
 * Created by WuYijie on 1/1/15.
 */
var express = require('express');
var router = express.Router();

// for Ning Xuefei
router.get('/', function(req, res){
    res.send('This is the second test module.');
});

module.exports = router;