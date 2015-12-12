'use strict'

const path = require('path');

module.exports = {
  main: function(req, res) {
    return res.sendfile('./app/views/index.html');
  }
}
