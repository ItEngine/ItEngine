'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Category = new Schema({
    idcateg: {type: Number, required: true, index: { unique: true }},
    name: {type: String, required: true },
});

module.exports = mongoose.model('category', Category);
