/**
 * Created by user on 12/5/14.
 */

var express = require('express');
var io = require('socket.io');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('demo', { pageTitle: '设计'});
    //res.send('respond with a resource');
});

module.exports = router;