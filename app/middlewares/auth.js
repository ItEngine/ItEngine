'use strict'

module.exports = {

  //Check if is logged
  login_required: function(req, res, next) {
    if (!req.session.user) {
      res.send('Error de autorización');
    } else {
      next();
    }
  },

  //Check if is logging if is ok redirect to admin
  is_logging: function(req, res, next){
    if (req.session.user) {
      res.redirect("/admin");
    } else {
      next();
    }
  }

}
