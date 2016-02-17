'use strict'

const Portfolio = require("../models/portfolio.js");
const Site = require("../models/site.js");

module.exports = {
  main: function(req, res) {
    try {
      //Component contact-form
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

      //Get sites and render index
      Site.find({}, function(err, data){
        return res.render('index', {show_menu: true, component: component, sites: data});
      });
    } catch (e) {
      return res.render("500");
    }
  },

  //See all portfolio
  portfolio: function(req, res){
    Portfolio.find({}, function(err, data){
      return res.render('portfolio', {show_menu: true, portfolio: data});
    });
  }
}
