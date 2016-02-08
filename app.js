'use strict';

//All requires native nodejs
const path = require('path');

//All requires packages nodejs
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

//Init server express
const app = express();

//Set setting file config.js
app.set('settings', require(path.join(process.cwd(), 'app', 'config')));
//Export data config for used in tempate
app.locals.settings = app.get('settings');

//Cookies
app.use(cookieParser());

//For manage sessions
app.use(session({
    secret: 'supernova',
    store: new MongoStore({ url: 'mongodb://' + app.get('settings').database.domain + '/sessions', autoRemove: 'disabled'}),
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: (24*3600*1000*30), expires: false}, // 30 Days in ms
}));

//Connect to database
mongoose.connect('mongodb://' + app.get('settings').database.domain + '/' + app.get('settings').database.name);

// Configure express to use handlebars templates
app.engine('.hbs', exphbs({ layoutsDir: "app/views/layouts", defaultLayout: 'main', extname: '.hbs' }));
app.set('views', path.join(process.cwd(), 'app', 'views'));
app.set('view engine', '.hbs');

//Set folder static files
app.use('/publics', express.static(process.cwd() + '/public'));
//Servind modules node_modules in the url scripts
app.use('/scripts', express.static(path.join(process.cwd() + '/node_modules')));
//Setvind module bower_components in the url scripts
app.use('/scripts_bower', express.static(path.join(process.cwd(), '/bower_components')));

//Passport config
require('./app/passport')(app);

//For the verbs HTTP get params
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

//Export my instance app for used in other files
module.exports = app;

//Load routes
require(path.join(process.cwd(), 'app', 'routes'))();

//Listen server
app.listen(app.get('settings').port, function() {
  console.log('Listening port: ' + app.get('settings').port)
});
