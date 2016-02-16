'use strict';

//For auth
const passport = require('passport');

//Middleware of authentication
const middlewareAuth = require("../../middlewares/auth");

var routesAdminIndex = function(app, controllers){

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

module.exports = routesAdminIndex;
