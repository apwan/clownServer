/**
 * Created by user on 12/5/14.
 */

var express = require('express');
var io = require('socket.io');
var router = express.Router();

router.get('/', function(req, res) {
    var cfg = {
        pageTitle: '设计',
        reveal_src: 'javascripts/reveal.min.js',
        jquery_src: 'javascripts/lib/jquery.min.js',
        socket_src: 'socket.io/socket.io.js',
        head_src: 'javascripts/lib/head.min.js'
    };
    res.render('demo', cfg);
    //res.send('respond with a resource');
});

module.exports = router;