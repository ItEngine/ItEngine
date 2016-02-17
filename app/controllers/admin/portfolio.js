'use strict'

const fs = require("fs");
//Model portfolio
const Portfolio = require("../../models/portfolio.js");

var self = {

  //Index crud
  index: function(req, res) {
    try {
      Portfolio.find({}, function(err, data){
        return res.render("admin/portfolio/portfolio", {
          is_admin: true,
          data: data
        });
      });
    } catch (e) {
      return res.render("500");
    }
  },

  //Display form newportfolio
  newportfolio: function(req, res){
    return res.render("admin/portfolio/portfoliocreate", {
      is_admin: true
    });
  },

  //Display form updateportfolio
  updateportfolio: function(req, res){
    let id = req.params.id;
    Portfolio.findOne({_id: id},function(err, doc){
        if (err){
          return res.render("500");
        }
        return res.render("admin/portfolio/portfolioupdate", {
          is_admin: true,
          doc: doc
        });
    });
  },

  //Checked if is insert or update and save
  insertOrUpdate: function(req, res, objPortfolio, is_new){
    let redirectUri = "/admin/portfolio";
    //If is new record
    if(is_new){
      //Insert record and save
      try {
        let portfolio = new Portfolio(objPortfolio);
        portfolio.save(function(){
          res.redirect(redirectUri);
        });
      } catch (e) {
        return res.render("500");
      }
    }else{
      //Get id
      let id = req.params.id;
      //Update record and save
      Portfolio.findOneAndUpdate({_id: id}, objPortfolio,function(err, portfolio){
        if(err){
          return res.render("500");
        }
        res.redirect(redirectUri);
      });
    }
  },

  //Upload photo client and call method for save record
  uploadPhotoAndSave: function(req, res, objPortfolio, is_new){
    //Upload photo a save record
    fs.readFile(req.files.photo.path, function (err, data) {
      let imageName = req.files.photo.name;
      if(imageName){
        //Add value photo
        objPortfolio['photo'] = imageName;
      }

      // If there's an error
      if(!imageName){
        console.log("Not image");
        //If not image, but is update only save in mongo
        if(!is_new){
          self.insertOrUpdate(req, res, objPortfolio, is_new);
        }else{
          //Photo is required in new record
          return res.render("500");
        }
      } else {
        let newPath = process.cwd() + "/public/portfolio/" + imageName;
        // write file
        fs.writeFile(newPath, data, function (err) {
          //If not error
          if(!err){
            self.insertOrUpdate(req, res, objPortfolio, is_new)
          }else{
            return res.render("500");
          }
        });
      }
    });
  },

  //Method that upload photo of clients and save record
  save: function(req, res, objPortfolio, is_new){
    self.uploadPhotoAndSave(req, res, objPortfolio, is_new);
  },

  //Save new record Portfolio
  insert: function(req, res){
    let name = req.body.name;
    let descrip = req.body.descrip;
    let tecnologies = req.body.tecnologies;
    let site_url = req.body.site_url;

    let objNewPortfolio = {
      name: name,
      descrip: descrip,
      tecnologies: tecnologies,
      site_url: site_url
    };

    self.save(req, res, objNewPortfolio, true);
  },

  //Delete record Portfolio
  delete: function(req, res){
    Portfolio.remove({ _id : req.params.id}, function (err) {
        res.redirect("/admin/portfolio");
    });
  },

  //Update password Portfolio
  update: function(req, res){
    let id = req.params.id;
    let name = req.body.name;
    let descrip = req.body.descrip;
    let tecnologies = req.body.tecnologies;
    let site_url = req.body.site_url;

    let objUpdatePortfolio = {
      name: name,
      descrip: descrip,
      tecnologies: tecnologies,
      site_url: site_url
    };

    //Get photo and save
    Portfolio.findOne({_id: req.params.id}, function(err, portfolio){
      objUpdatePortfolio['photo'] = portfolio.photo;
      //Upload photo and save record
      self.save(req, res, objUpdatePortfolio, false);
    })
  },

}

module.exports = self;
