const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
 
const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({ extended :  true}));
app.use(bodyparser.json());
// app.use('/',Database);


module.exports = app;