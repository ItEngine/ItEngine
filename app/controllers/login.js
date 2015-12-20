'use strict'

//For encrypt password
const crypto = require('crypto');
//Model user
const User = require("../models/user.js");

module.exports = {
  //Show form login
  main: function(req, res) {
    let component = "System.import('formLogin').catch(console.error.bind(console));";
    return res.render('login', {component: component});
  },

  //Process data login and redirect
  login: function(req, res){
    let email = req.body.email;
    let password = req.body.password;

    //Generate hash
    let hashedPassword = crypto.createHash('sha512').update(password).digest('hex');

    //Check if is one user correct
    User.findOne({email: email}, function(err, user) {
      if (user.password === hashedPassword) {
        req.session.user = email;
        res.redirect('/admin');
      } else {
        return res.end("Login incorrecto.");
      }
    });
  }
}
