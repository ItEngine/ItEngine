'use strict'

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

let Portfolio = new Schema({
    name: {type: String, required: true},
    descrip: {type: String, required: true},
    tecnologies   : {type: String, required: true},
    site_url   : {type: String, required: true},
    photo   : {type: String}
});
Portfolio.plugin(mongoosePaginate);

module.exports = mongoose.model('portfolio', Portfolio);