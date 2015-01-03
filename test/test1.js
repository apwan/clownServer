/**
 * Created by WuYijie on 1/1/15.
 */
var express = require('express');
var router = express.Router();

// for Lin Zinan
router.post('/reg', function(req, res){
   res.render('reg',{});
    //res.send('This is the first test module.');
});

module.exports = router;