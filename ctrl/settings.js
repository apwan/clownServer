/**
 * Created by lzn on 12/28/14.
 */

module.exports = {

	db: {
		name: process.env.DB||'clown',
		host: process.env.HOST||'scoreur.net',
		port: process.env.MONGOPORT||27017,
		user: process.env.DBUSER||'clown',
		pwd: process.env.DBPWD||'clown',
		admin: process.envDBADMIN||'admin',
		sudo: process.env.DBSUDO||null


	},
	collections:{
		users:'users', slides:'slides',
		slides_contents: 'slides.contents',
		resources:'resources', sessions:'sessions',
		present: 'presstate'
	},
	cookieSecret: process.env.SECRET||'hahaha',
    urls: {
		cfg:'/cfg', data:'/deck-data', save:'/save',
		view:'/slide-watch', pres:'/slide-change', prof:'/prof',
		show:'/slide-show'
	},
	err_slide_id: '54af3cf1bcc7de9b2902ffcd',
	guest_uid:'54af4cd9e5abfb131d636885'
};