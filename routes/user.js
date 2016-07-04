var router = require('express').Router();
var gravatar = require('gravatar');
var db = require('../ctrl/db');
//var Slide = require('../ctrl/slide');

/**
 * 用户主页
 */
<<<<<<< HEAD
router.get('/', function (req, res) {
=======
router.get("/:uid(\\d+)?/:op?", function(req, res, next){
	console.log('param', req.params.uid, req.params.format);
>>>>>>> master
	var reJson = {
		login: 1,
		name: req.session.user? req.session.user.name:'guest',
		email: req.session.user? req.session.user.email: 'guest@scoreur.net',
		avatar: gravatar.url(req.session.user.email ,  {s: '100', r: 'x', d: 'retro'}, true)
	};
	db.getSlideList(req.session.user._id, function(err, docs) {
		reJson.slideList = docs;
<<<<<<< HEAD
		console.log('get slide list: ', docs);
		res.render('space', reJson);
	});
=======
		//console.log('get slide list: ', docs);
		res.render('space', reJson);
	});

>>>>>>> master
});

module.exports = router;