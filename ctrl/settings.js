/**
 * Created by lzn on 12/28/14.
 */

module.exports = {
	db: process.env.DB||'clown',
	host: process.env.HOST||'scoreur.net',
	port: process.env.MONGOPORT||27017,
	dbuser: process.env.DBUSER||'clown',
	dbpwd: process.env.DBPWD||'clown',
	collectionList:['users', 'slides', 'resources', 'sessions'],
	cookieSecret: process.env.SECRET||'hahaha',
    urls: {
		cfg:'/cfg', data:'/deck-data', save:'/save',
		view:'/slide-watch', pres:'/slide-change', prof:'/prof'
	},
	err_slide_id: '54af3cf1bcc7de9b2902ffcd',
	guest_uid:'54af4cd9e5abfb131d636885'
};