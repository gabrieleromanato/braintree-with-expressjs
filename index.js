'use strict';

const path = require('path');
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes');

app.set('view engine', 'ejs');

app.disable('x-powered-by');

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(bodyParser.urlencoded( { extended: true } ) );
app.use('/', routes);

app.listen(port);