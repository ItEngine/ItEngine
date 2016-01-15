'use strict'

//Model user
const Category = require("../../models/category.js");

module.exports = {

  //Show admin
  index: function(req, res) {
    try {
      Category.find({}, function(err, data){
        return res.render("admin/categories/categories", {
          is_admin: true,
          data: data
        });
      });
    } catch (e) {
      return res.render("500");
    }
  },

  //Display form new category
  newcategory: function(req, res){
    return res.render("admin/categories/categorycreate", {
      is_admin: true
    });
  },

  //Save new record category
  insert: function(req, res){
    let idcateg = req.body.idcateg;
    let name = req.body.name;

    try {
      let category = new Category({idcateg: idcateg, name: name});
      category.save(function(){
        res.redirect("/admin/categories");
      });
    } catch (e) {
      return res.render("500");
    }
  },

  //Delete record category
  delete: function(req, res){
    Category.remove({ _id : req.params.id}, function (err) {
        res.redirect("/admin/categories");
    });
  },

  //Display form updatecategory
  updatecategory: function(req, res){
    let id = req.params.id;
    Category.findOne({_id: id},function(err, doc){
        if (err){
          return res.render("500");
        }
        return res.render("admin/categories/categoryupdate", {
          is_admin: true,
          doc: doc
        });
    });
  },

  //Update category
  update: function(req, res){
    let idcateg = req.body.idcateg;
    let name = req.body.name;

    Category.findOneAndUpdate({idcateg: idcateg}, {name: name},function(err, category){
      if(err){
        return res.render("500");
      }

      res.redirect("/admin/categories");
    });
  },

}
