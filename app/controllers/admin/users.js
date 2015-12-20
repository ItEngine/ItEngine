'use strict'
//For encrypt password
const crypto = require('crypto');
//Model user
const User = require("../../models/user.js");

module.exports = {

  //Show admin
  index: function(req, res) {
    try {
      User.find({}, function(err, data){
        return res.render("admin/users/users", {
          is_admin: true,
          data: data
        });
      });
    } catch (e) {
      return res.render("500");
    }
  },

  //Display form newuser
  newuser: function(req, res){
    return res.render("admin/users/usercreate", {
      is_admin: true
    });
  },

  //Save new record user
  insert: function(req, res){
    let email = req.body.email;
    let password = req.body.password;

    let hashedPassword = crypto.createHash('sha512').update(password).digest('hex');

    try {
      let user = new User({email: email, password: hashedPassword});
      user.save(function(){
        res.redirect("/admin/users");
      });
    } catch (e) {
      return res.render("500");
    }
  },

  //Delete record user
  delete: function(req, res){
    User.remove({ _id : req.params.id}, function (err) {
        res.redirect("/admin/users");
    });
  },

  //Display form updateuser
  updateuser: function(req, res){
    User.find({_id: req.params.id},function(err, doc){
        if (err){
          return res.render("500");
        }
        let email = doc[0].email;
        return res.render("admin/users/userupdate", {
          is_admin: true,
          email: email
        });
    });
  },

  //Update password user
  update: function(req, res){
    let email = req.body.email;
    let password = req.body.password;

    let hashedPassword = crypto.createHash('sha512').update(password).digest('hex');

    User.findOneAndUpdate({email: req.body.email}, {password: hashedPassword},function(err, user){
      if(err){
        return res.render("500");
      }

      res.redirect("/admin/users");
    });
  },

}
