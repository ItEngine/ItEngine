'use strict'

//All requires native nodejs
const path = require('path');

//All requires packages nodejs
const bodyParser = require('body-parser');
const express = require('express');

//Routes main
const indexRoutes = require("./routes/index");

//Init server express
const app = express();

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

//Init routes main
indexRoutes(app);

//Listen server
app.listen(3000, function() {
  console.log('Listening port: 3000')
});
