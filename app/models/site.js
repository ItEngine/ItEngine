'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Site = new Schema({
    descrip   : {type: String, required: true},
    company   : {type: String, required: true},
    type_company: {type: String, required: true},
    site_company   : {type: String, required: true},
    tecnologies   : {type: String, required: true},
    photo   : {type: String}
});

module.exports = mongoose.model('site', Site);
