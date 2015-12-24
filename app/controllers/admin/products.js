'use strict'

const XLSX = require('xlsx');
const fs = require('fs-extra');
const path = require('path');
//Model product
const Product = require("../../models/product.js");

module.exports = {

  //Show admin
  index: function(req, res){
    try {
      Product.find({}, function(err, data){
        return res.render("admin/products/products", {
          is_admin: true,
          data: data
        });
      });
    } catch (e) {
      return res.render("500");
    }
  },

  //Import file xls and load in mongodb
  import: function(req, res){
    //Upload file
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
      //Create file in public/upload
      let pathFile = process.cwd() + '/public/upload/' + filename;
      let fstream = fs.createWriteStream(pathFile);
      file.pipe(fstream);
      fstream.on('close', function () {
          console.log("Upload Finished of " + filename);
          //Read xls
          let workbook = XLSX.readFile(pathFile);
          let sheet_name_list = workbook.SheetNames;
          let i=1;
          sheet_name_list.forEach(function(y) { /* iterate through sheets */
            let worksheet = workbook.Sheets[y];
            for (let z in worksheet){
              if(z[0] === '!') continue;
              i++;
              let item = worksheet[z].v;
              if(i>4){
                console.log(item);
              }
            }
          });
      });
    });
  },

  //Display form new product
  newproduct: function(req, res){
    return res.render("admin/products/productcreate", {
      is_admin: true
    });
  },

  //Save new record product
  insert: function(req, res){
    let name = req.body.name;
    let price = req.body.price;
    let url = req.body.url;

    try {
      let product = new Product({name: name, price: price, url: url});
      product.save(function(){
        res.redirect("/admin/products");
      });
    } catch (e) {
      return res.render("500");
    }
  },

  //Delete record product
  delete: function(req, res){
    Product.remove({ _id : req.params.id}, function (err) {
        res.redirect("/admin/products");
    });
  },

  //Display form update products
  updateproduct: function(req, res){
    let id = req.params.id;
    Product.findOne({_id: id},function(err, doc){
        if (err){
          return res.render("500");
        }
        return res.render("admin/products/productupdate", {
          is_admin: true,
          doc: doc,
          id: id
        });
    });
  },

  //Update password product
  update: function(req, res){
    let id = req.params.id;
    let name = req.body.name;
    let price = req.body.price;
    let url = req.body.url;

    Product.findOneAndUpdate({_id: id}, {name: name, price: price, url: url},function(err, user){
      if(err){
        return res.render("500");
      }

      res.redirect("/admin/products");
    });
  },

}
