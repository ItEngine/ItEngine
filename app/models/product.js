'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Product = new Schema({
    name       : {type: String, required: true },
    price   : {type: Number, required: true},
    url   : {type: String, required: true},
});

module.exports = mongoose.model('product', Product);
