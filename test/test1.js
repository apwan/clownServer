/**
 * Created by WuYijie on 1/1/15.
 */
var express = require('express');
var router = express.Router();
var User = require('../ctrl/user.js');

// for Lin Zinan
router.post('/reg', function(req, res){
	var reJson = {
		receive: 1
	}
	res.send('1');
	res.send(req.body.toString());
	if (req.body['repassword'] != req.body['password']) {
		reJson.success = 0;
		reJson.errmsg = '两次输入的口令不一致';
		res.send(reJson.toString());
	} else if (req.body['password'] == '') {
		reJson.success = 0;
		reJson.errmsg = '密码不能为空';
		res.send('2');
		res.send(reJson.toString());
	} else if (req.body['username'].length < 3) {
		reJson.success = 0;
		reJson.errmsg = '用户名小于3个字符';
		res.send(reJson.toString());
	} else {
		User.getUserByName(req.body['username'], function(err, userT) {
			if (!err || userT) {
				reJson.success = 0;
				reJson.errmsg = '用户名已存在';
				res.send(reJson.toString());
			} else {
				var newUser = new User({
					name: req.body['username'],
					email: req.body['email'],
					password: crypto.createhash('md5').update(req.body['password']).digest('base64')
				});
				newUser.createUser(function (err, userT) {
					if (err) {
						reJson.success = 0;
						reJson.errmsg = err.toString();
						res.send(reJson.toString());
					} else {
						req.session.user = userT;
						reJson.success = 1;
						res.send(reJson.toString());
					}
				});
				
			}
		});
	}
	res.send('end');
    //res.send('This is the first test module.');
});

router.get('/reg', function(req, res){
   res.render('reg',{});
    //res.send('This is the first test module.');
});

module.exports = router;