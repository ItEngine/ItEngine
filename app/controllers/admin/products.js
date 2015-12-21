'use strict'

//Model product
const Product = require("../../models/product.js");

module.exports = {

  //Show admin
  index: function(req, res) {
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
