'use strict';

const fs = require("fs");
//Model site
const Site = require("../../models/site.js");

var self = {

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

  //Checked if is insert or update and save
  insertOrUpdate: function(req, res, objSite, is_new){
    let redirectUri = "/admin/sites";
    //If is new record
    if(is_new){
      //Insert record and save
      try {
        let site = new Site(objSite);
        site.save(function(){
          res.redirect(redirectUri);
        });
      } catch (e) {
        return res.render("500");
      }
    }else{
      //Get id
      let id = req.params.id;
      //Update record and save
      Site.findOneAndUpdate({_id: id}, objSite,function(err, site){
        if(err){
          return res.render("500");
        }
        res.redirect(redirectUri);
      });
    }
  },

  //Upload photo client and call method for save record
  uploadPhotoAndSave: function(req, res, objSite, is_new){
    //Upload photo a save record
    fs.readFile(req.files.photo.path, function (err, data) {
      let imageName = req.files.photo.name;
      if(imageName){
        //Add value photo
        objSite['photo'] = imageName;
      }

      // If there's an error
      if(!imageName){
        console.log("Not image");
        //If not image, but is update only save in mongo
        if(!is_new){
          self.insertOrUpdate(req, res, objSite, is_new);
        }else{
          //Photo is required in new record
          return res.render("500");
        }
      } else {
        let newPath = process.cwd() + "/public/clients/" + imageName;
        // write file
        fs.writeFile(newPath, data, function (err) {
          //If not error
          if(!err){
            self.insertOrUpdate(req, res, objSite, is_new)
          }else{
            return res.render("500");
          }
        });
      }
    });
  },

  //Method that upload photo of clients and save record
  save: function(req, res, objSite, is_new){
    self.uploadPhotoAndSave(req, res, objSite, is_new);
  },

  //Save new record site
  insert: function(req, res){
    let descrip = req.body.descrip;
    let company = req.body.company;
    let site_company = req.body.site_company;
    let tecnologies = req.body.tecnologies;
    let type_company = req.body.type_company;

    let objNewSite = {
      descrip: descrip,
      company: company,
      site_company: site_company,
      tecnologies: tecnologies,
      type_company: type_company
    };

    //Upload photo and save record
    self.save(req, res, objNewSite, true);
  },

  //Delete record user
  delete: function(req, res){
    Site.remove({ _id : req.params.id}, function (err) {
        res.redirect("/admin/sites");
    });
  },

  //Update site
  update: function(req, res){
    let descrip = req.body.descrip;
    let company = req.body.company;
    let site_company = req.body.site_company;
    let tecnologies = req.body.tecnologies;
    let type_company = req.body.type_company;

    let objUpdateSite = {
      descrip: descrip,
      company: company,
      site_company: site_company,
      tecnologies: tecnologies,
      type_company: type_company
    }

    //Get photo and save
    Site.findOne({_id: req.params.id}, function(err, site){
      objUpdateSite['photo'] = site.photo;
      //Upload photo and save record
      self.save(req, res, objUpdateSite, false);
    })
  },

}

module.exports = self;
