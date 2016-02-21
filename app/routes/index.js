'use strict';

const routesIndex = function(app, controllers){

  //Index
  app.route('/').get(controllers.index.main);
  app.route('/portfolio').get(controllers.index.portfolio);

  //For send email with form contact
  app.post('/send_email', controllers.email.indexFormContact);

}

module.exports = routesIndex;
