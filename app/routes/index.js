'use strict';

var routesIndex = function(app, controllers){

  //Index
  app.route('/').get(controllers.index.main);

  //For send email with form contact
  app.post('/send_email', controllers.email.indexFormContact);

}

module.exports = routesIndex;
