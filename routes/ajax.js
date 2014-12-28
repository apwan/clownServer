var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
   var cfg = {
      username: 'Guest',
      email: 'Guest@clown.scoreur.net'
   };
   res.render('edit', cfg);
});

module.exports = router;