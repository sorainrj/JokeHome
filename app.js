var express = require('express');
var path = require('path');

var init = require('./functions/init');
init();

var routes = require('./routes/index');
var users = require('./routes/users');
var rank = require('./routes/rank');
var rankFunction = require('./functions/rankFunction');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jokeHome');

var app = express();

var bodyParser = require('body-parser');
var multer = require('multer'); 
//app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
//app.use(multer()); // for parsing multipart/form-data

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/rank', rank);

// rankFunction.sortRank();

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

app.listen(900,function()
{
	console.log('listening to 80');
});

module.exports = app;
