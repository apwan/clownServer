// require node module
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var settings = require('./ctrl/settings');
console.log('start with settings:', settings);
var db = require('./ctrl/db');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);


var app = express();

/**
 *  Basic configuration
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3000);// default 3000
app.use(favicon(__dirname + '/public/favicon.ico'));
if(process.env.DEV){
    app.use(logger('dev'));
}else{
    //only log err
    app.use(logger('combined', {
        skip: function (req, res) { return res.statusCode < 400 }
    }));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({

	secret: settings.cookieSecret,
	key: settings.db,
    cookie: { maxAge: 2 * 60 * 60},
	store: new MongoStore({
        // Basic usage
        host: settings.db.host, // Default, optional
        port: settings.db.port, // Default, optional
        db: settings.db.name, // Required
        // Basic authentication (optional)
        username: settings.db.user,
        password: settings.db.pwd,
        // Advanced options (optional)
        autoReconnect: true, // Default
        w: 1, // Default,
        ssl: false // Default
	})
}));
/**
 * Launch server
 * @type {http.Server}
 */
var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});


/**
 *
 * @type {router}
 */
// main entry
var routes = require('./routes/index')(server);
// for file transfer
var users = require('./routes/users');
// for SE course final presentation
var demo = require('./routes/demo');
// for dynamic loading information
var ajax = require('./routes/ajax');



/**
 *  Routes planning
 */
app.use('/', routes);
app.use('/users', users);
app.use('/demo', demo);
app.use('/ajax', ajax);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers

// development error handler will print stacktrace
if (process.env.DEV) {
    app.use(function(err, req, res, next) {

        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}else{
    // production error handler no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        if(err.status == 404){
            return res.redirect('/');
        }else{
            res.status(err.status || 500);
            res.send('error');
        }
    });

}

module.exports = app;
