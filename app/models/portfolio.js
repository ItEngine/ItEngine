'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Portfolio = new Schema({
    name: {type: String, required: true},
    descrip: {type: String, required: true},
    tecnologies   : {type: String, required: true},
    site_url   : {type: String, required: true},
    photo   : {type: String}
});

module.exports = mongoose.model('portfolio', Portfolio);
