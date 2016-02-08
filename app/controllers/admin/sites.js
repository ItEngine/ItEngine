'use strict';

//Model site
const Site = require("../../models/site.js");

module.exports = {

  //Show admin
  index: function(req, res) {
    try {
      Site.find({}, function(err, data){
        return res.render("admin/sites/sites", {
          is_admin: true,
          data: data
        });
      });
    } catch (e) {
      return res.render("500");
    }
  },

  //Display form newsite
  newsite: function(req, res){
    return res.render("admin/sites/sitecreate", {
      is_admin: true
    });
  },

  //Save new record site
  insert: function(req, res){
    let descrip = req.body.descrip;
    let company = req.body.company;
    let site_company = req.body.site_company;
    let tecnologies = req.body.tecnologies;
    let photo = req.body.photo;
    let type_company = req.body.type_company;

    let objNewSite = {
      descrip: descrip,
      company: company,
      site_company: site_company,
      tecnologies: tecnologies,
      photo: photo,
      type_company: type_company
    }

    try {
      let site = new Site(objNewSite);
      site.save(function(){
        res.redirect("/admin/sites");
      });
    } catch (e) {
      return res.render("500");
    }
  },

  //Delete record user
  delete: function(req, res){
    Site.remove({ _id : req.params.id}, function (err) {
        res.redirect("/admin/sites");
    });
  },

  //Display form updatesite
  updatesite: function(req, res){
    let id = req.params.id;
    Site.findOne({_id: id},function(err, doc){
        if (err){
          return res.render("500");
        }
        return res.render("admin/sites/siteupdate", {
          is_admin: true,
          doc: doc
        });
    });
  },

  //Update site
  update: function(req, res){
    let id = req.params.id;
    let descrip = req.body.descrip;
    let company = req.body.company;
    let site_company = req.body.site_company;
    let tecnologies = req.body.tecnologies;
    let photo = req.body.photo;
    let type_company = req.body.type_company;

    let objUpdateSite = {
      descrip: descrip,
      company: company,
      site_company: site_company,
      tecnologies: tecnologies,
      photo: photo,
      type_company: type_company
    }

    Site.findOneAndUpdate({_id: id}, objUpdateSite,function(err, user){
      if(err){
        return res.render("500");
      }

      res.redirect("/admin/sites");
    });
  },

}
