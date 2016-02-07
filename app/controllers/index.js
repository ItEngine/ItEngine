'use strict'

module.exports = {
  main: function(req, res) {
    try {
      let component = `
          System.config({
            paths: {
                'ng2-contact-form/*': 'scripts/ng2-contact-form/*.js',
            },
            packages: {
              publics: {
                format: 'register',
                defaultExtension: 'js'
              }
            }
          });

          System.import('publics/boot.contact')
            .then(null, console.error.bind(console));
      `;
      //Load component contact form
      return res.render('index', {show_menu: true, component: component});
    } catch (e) {
      return res.render("500");
    }
  }
}
