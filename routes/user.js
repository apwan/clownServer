var router = require('express').Router();
var gravatar = require('gravatar');
var Slide = require('../ctrl/slide');

/**
 * 用户主页
 */
router.get('/space', function (req, res) {
	var reJson = {
		login: 1,
		name: req.session.user? req.session.user.name:'guest',
		email: req.session.user? req.session.user.email: 'guest@scoreur.net',
		avatar: gravatar.url(req.session.user.email ,  {s: '100', r: 'x', d: 'retro'}, true)
	};
	Slide.getSlideListByCreator(req.session.user._id, function(err, docs) {
		reJson.slideList = docs;
		console.log(docs);
		res.render('space', reJson);
	});
});

module.exports = router;