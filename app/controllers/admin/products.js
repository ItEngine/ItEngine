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

    //If has upload file
    req.busboy.on('file', function (fieldname, file, filename) {
      //Create file in public/upload
      let pathFile = process.cwd() + '/public/upload/' + filename;

      //Check if exist file
      if(!filename){
        res.redirect("/admin/products");
        return false;
      }

      let fstream = fs.createWriteStream(pathFile);
      file.pipe(fstream);

      //Has finished read strem
      fstream.on('close', function () {
          //Read xls
          let workbook = XLSX.readFile(pathFile);
          //get sheets
          let sheet_name_list = workbook.SheetNames;
          //Count for avoid header
          let counterAvoidHeader=1;
          //Model object products (Init)
          let objRecord = {
            name: "",
            price: 0,
            url: "",
            category: 0
          };
          //To see if the object is complete
          let recordFinish = 1;

          //iterate through sheets
          sheet_name_list.forEach(function(y) {
            let worksheet = workbook.Sheets[y];
            //iterate worksheet
            for (let z in worksheet){
              if(z[0] === '!') continue;
              //Value column
              let valueColumn = worksheet[z].v;
              //Avoid header
              if(counterAvoidHeader>4){

                //Check that field is
                switch (recordFinish) {
                  case 1:
                    objRecord['name'] = valueColumn;
                    break;
                  case 2:
                    objRecord['price'] = valueColumn;
                    break;
                  case 3:
                    objRecord['url'] = valueColumn;
                    break;
                  case 4:
                    objRecord['category'] = valueColumn;
                    break;
                }

                //If is 4 record Finished
                if(recordFinish == 4){
                  //Object complete and saved
                  recordFinish = 1;
                  //Insert record in mongodb
                  let product = new Product(objRecord);
                  product.save(function(){
                    //Saved
                  });
                }else{
                  //The object is not complete
                  recordFinish++;
                }
              }else{
                //Count for avoid header
                counterAvoidHeader++;
              }
            }
          });

          //Finished import file
          res.redirect("/admin/products");
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
    let category = req.body.category;

    try {
      let product = new Product({name: name, price: price, url: url, category: category});
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
    let category = req.body.category;

    Product.findOneAndUpdate({_id: id}, {name: name, price: price, url: url, category: category},function(err, user){
      if(err){
        return res.render("500");
      }

      res.redirect("/admin/products");
    });
  },

}
