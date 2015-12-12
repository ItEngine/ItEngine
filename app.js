'use strict'

//All requires native nodejs
const path = require('path');

//All requires packages nodejs
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

//Init server express
const app = express();

//Set folder data configuration
app.set('settings', require(path.join(process.cwd(), 'app', 'config')));
//Set folder views
app.set('views', path.join(process.cwd(), 'app', 'views'));

//Set folder static files
app.use('/', express.static(__dirname + '/public'));

//For the verbs HTTP get params
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

//Servind modules node_modules in the url scripts
app.use('/scripts', express.static(path.join(__dirname, '/node_modules')));
//Setvind module bower_components in the url scripts
app.use('/scripts_bower', express.static(path.join(__dirname, '/bower_components')));

//Export data config
app.locals.settings = app.get('settings');

//Connect to database
mongoose.connect('mongodb://' + app.get('settings').database.domain + '/' + app.get('settings').database.name);

//Export my instance app
module.exports = app;

//Load routes
require(path.join(process.cwd(), 'app', 'routes'))();

//Listen server
app.listen(app.get('settings').port, function() {
  console.log('Listening port: ' + app.get('settings').port)
});
