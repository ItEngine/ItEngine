'use strict'

module.exports = {
  main: function(req, res) {
    //Load component contact form
    let component = "System.import('contactForm').catch(console.error.bind(console));";
    return res.render('index', {component: component, show_menu: true});
  }
}
