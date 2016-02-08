'use strict'

//All requires native nodejs
const path = require('path');
const fs = require('fs');

//For get sync folder files controllers
const glob = require('glob');
//For auth
const passport = require('passport');

//My instance of app.js (this found because previosly export)
const app = require(path.join(process.cwd(), 'app'));
//Middleware of authentication
const middlewareAuth = require("./middlewares/auth");

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
  /*Main routes */

  //Index
  app.route('/').get(controllers.index.main);

  //For send email with form contact
  app.post('/send_email', controllers.email.indexFormContact);

  /* Routes admin */

  //login
  app.get("/login", middlewareAuth.is_logging, controllers.login.main);
  app.post('/login', passport.authenticate('local', {successRedirect: '/admin/'}));

  //Home
  app.route('/admin').get(middlewareAuth.login_required, controllers.admin.index.main);

  //Logout admin
  app.route('/admin/logout').get(middlewareAuth.login_required, controllers.admin.index.logout);

  /* Crud users */
  /*------------*/
  app.route('/admin/users').get(middlewareAuth.login_required, controllers.admin.users.index);

  //Add user
  app.route('/admin/user/insert')
    .get(middlewareAuth.login_required, controllers.admin.users.newuser)
    .post(middlewareAuth.login_required, controllers.admin.users.insert);

  //Delete user
  app.route('/admin/user/delete/:id').get(middlewareAuth.login_required, controllers.admin.users.delete);

  //Update user
  app.route('/admin/user/update/:id')
    .get(middlewareAuth.login_required, controllers.admin.users.updateuser)
    .post(middlewareAuth.login_required, controllers.admin.users.update);

  /* Crud sites */
  /*------------*/
  app.route('/admin/sites').get(middlewareAuth.login_required, controllers.admin.sites.index);

  //Add site
  app.route('/admin/site/insert')
    .get(middlewareAuth.login_required, controllers.admin.sites.newsite)
    .post(middlewareAuth.login_required, controllers.admin.sites.insert);

  //Delete site
  app.route('/admin/site/delete/:id').get(middlewareAuth.login_required, controllers.admin.sites.delete);

  //Update site
  app.route('/admin/site/update/:id')
    .get(middlewareAuth.login_required, controllers.admin.sites.updatesite)
    .post(middlewareAuth.login_required, controllers.admin.sites.update);

}
