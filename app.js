// require node module
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var settings = require('./ctrl/settings');
console.log('start with settings:', settings);
var db = require('./ctrl/db').db;
db.init();
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);


var app = express();

/**
 *  Basic configuration
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT | 3000);// default 3000
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
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
        host: settings.host, // Default, optional
        port: settings.port, // Default, optional
        db: settings.db, // Required
        // Basic authentication (optional)
        username: settings.dbuser,
        password: settings.dbpwd,
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
    require('./routes/index').init(server);
});


/**
 *
 * @type {router}
 */
// main entry
var routes = require('./routes/index').router;
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


// configure socket control
// set up socket


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
