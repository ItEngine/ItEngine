'use strict'

module.exports = {

  //Show admin
  main: function(req, res) {
    return res.render("admin/home", {is_admin: true, session: req.session});
  },

  //Logout admin
  logout: function(req, res){
    try {
      delete req.session.user;
    } catch (e) {
      return res.render("500");
    } finally {
      return res.redirect("/login");
    }
  }
}
