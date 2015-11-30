/*
*
* DISCLAIMER:
* The contents of this web application do not nessarily reflect the offical 
* views or policies of the Virginia Department of Transportation, the 
* Commonwealth Transportation Board, or the Federal Highway Administration.
* This weeb app does not constitue a standard, specification, or regulation.
* Any inclusion of manufacturer names, trade names, or trademarksis for 
* identification purposes only and is not to be considered an endorsement.
* 
*/

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');

var mongoose = require('mongoose');

//connection to local Mongo Database

mongoose.connect('mongodb://127.0.0.1/RoadTestDB', function(err, db){
	if (!err) {
		console.log("Mongo Server port: Connected to App");
	};
});
var port = process.env.PORT || 3000;

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(__dirname+'/build/favicon.ico'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

//App is able to grab javscript, css, and images
app.use(express.static(path.join(__dirname, 'build')));

var session = require('express-session');
var flash = require('connect-flash');

app.use(session({secret: 'RoadE5t1mateT00L',
				saveUninitialized: true,
				resave: false}));
app.use(flash());
app.use(helmet());

var routes = require('./routes/index');
var datarecords = require('./routes/datarecords');

app.use('/', routes);
app.use('/datarecords', datarecords);

app.listen(port);
console.log('Server running on port: '+port);