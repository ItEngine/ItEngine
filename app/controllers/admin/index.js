'use strict'

module.exports = {

  //Show admin
  main: function(req, res) {
    return res.render("admin/home", {is_admin: true, session: req.session});
  },

  //Logout admin
  logout: function(req, res){
    delete req.session.user;
    return res.redirect("/login");
  }
}
