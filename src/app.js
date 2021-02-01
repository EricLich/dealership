const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.set('port', process.env.PORT || 4000);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

module.exports = app;