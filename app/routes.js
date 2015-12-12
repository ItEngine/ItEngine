'use strict'

//All requires native nodejs
const path = require('path');
const fs = require('fs');

//My instance of app.js (this found because previosly export)
const app = require(path.join(process.cwd(), 'app'));

//For get sync folder files controllers
const glob = require('glob');

//Load arrays with require controllers
let controllers = {};
let files = glob.sync(path.join(process.cwd(), 'app', 'controllers', '**', '*.js'));
files.forEach(function(file) {
  let temp = controllers;
  let parts = path.relative(path.join(process.cwd(), 'app', 'controllers'), file).slice(0, -3).split(path.sep);

  while (parts.length) {
    if (parts.length === 1) {
      temp[parts[0]] = require(file);
    } else {
      temp[parts[0]] = temp[parts[0]] || {};
    }
    temp = temp[parts.shift()];
  }
});

// Routes of application
module.exports = function(){

  //Index
  app.route('/').get(controllers.index.main);

  //For send email with form contact
  app.post('/send_email', controllers.email.indexFormContact);

}
