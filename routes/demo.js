/**
 * Created by WuYijie on 12/5/14.
 */

var express = require('express');
var io = require('socket.io');
var router = express.Router();


router.get('/', function(req, res) {
	var cfg = {
		title: 'Design',
        username: 'Guest',
        socket_src: '/socket.io/socket.io.js',
        head_src: '/javascripts/lib/head.min.js',
        uses:{
            loader: false,
            resume: true,
            sections: false

        },
        secbtns:{}
	};
	res.render('demo', cfg);
});

router.get('/watch', function(req, res) {
	var cfg = {
		title: 'Design',
        reveal_src: '/javascripts/lib/reveal.min.js',
        socket_src: '/socket.io/socket.io.js',
        head_src: '/javascripts/lib/head.min.js',
        uses:{
            loader: true,
            resume: true,
            sections: false

        }
    };
	res.render('test-watch', cfg);
});

module.exports = router;