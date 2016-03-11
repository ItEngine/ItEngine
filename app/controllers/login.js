'use strict'

//For encrypt password
const crypto = require('crypto');
//Model user
const User = require("../models/user.js");

module.exports = {
  //Show form login
  main: function(req, res) {
    let component = `
        System.import('publics/boot.login')
          .then(null, console.error.bind(console));
    `;
    return res.render('login', {component: component});
  },

  //Process data login and redirect
  login: function(req, res){
    res.redirect('/admin');
  }
}
