'use strict'

module.exports = {

  //Show admin
  index: function(req, res) {
    return res.render("admin/users", {is_admin: true});
  },

}
