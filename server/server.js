const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const path = require('path');


const busboy = require('connect-busboy');
const busboyBodyParser = require('busboy-body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(busboy());
app.use(busboyBodyParser());

const config = require('../config/config');

const port  = process.env.PORT || 8080;

// Test for git update !!!


// Configuration
// ================================================================================================


// API routes
require('./routes')(app);



app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }

  console.info('>>> 🌎 Open http://0.0.0.0:%s/ in your browser.', port);
});

module.exports = app;
