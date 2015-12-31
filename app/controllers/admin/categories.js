'use strict'

module.exports = {

  //Show admin
  index: function(req, res) {
    console.log("index");
  },

  //Display form new category
  newcategory: function(req, res){
    console.log("newcategory");
  },

  //Save new record category
  insert: function(req, res){
    console.log("insert");
  },

  //Delete record category
  delete: function(req, res){
    console.log("delete");
  },

  //Display form updatecategory
  updatecategory: function(req, res){
    console.log("updatecategory");
  },

  //Update category
  update: function(req, res){
    console.log("update");
  },

}
