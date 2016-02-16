'use strict';
const path = require('path');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

var expressConfig = function(app){
  //Set setting file config.js
  app.set('settings', require('./config'));
  //Export data config for used in tempate
  app.locals.settings = app.get('settings');

  // Configure express to use handlebars templates
  app.engine('.hbs', exphbs({ layoutsDir: "app/views/layouts", defaultLayout: 'main', extname: '.hbs' }));
  app.set('views', path.join(process.cwd(), 'app', 'views'));
  app.set('view engine', '.hbs');

  //Override with the X-HTTP-Method-Override header in the request
  app.use(methodOverride('X-HTTP-Method-Override'));

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

  //Set folder static files
  app.use('/publics', express.static(process.cwd() + '/public'));
  //Servind modules node_modules in the url scripts
  app.use('/scripts', express.static(path.join(process.cwd() + '/node_modules')));
  //Setvind module bower_components in the url scripts
  app.use('/scripts_bower', express.static(path.join(process.cwd(), '/bower_components')));

  //For the verbs HTTP get params
  app.use(bodyParser.json());       // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  }));

  //Connect to database
  mongoose.connect('mongodb://' + app.get('settings').database.domain + '/' + app.get('settings').database.name);
}

module.exports = expressConfig;
