'use strict'

const paginate = require('express-paginate');

const Portfolio = require("../models/portfolio.js");
const Site = require("../models/site.js");

module.exports = {
  main: function(req, res) {
    try {
      //Component contact-form
      let component = `
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
    Portfolio.paginate({}, { page: req.query.page, limit: req.query.limit }, function(err, data, pageCount, itemCount) {
      //Init object pages
      let pages = {
        total: []
      };

      //Seto to array count pages
      for(let i=1;i<=data.pages;i++){
        pages.total.push(i);
      }

      return res.render('portfolio', {
        show_menu: true,
        portfolio: data,
        pages: pages
      });
    });
  }
}
