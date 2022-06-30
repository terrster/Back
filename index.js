'use strict'

require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`
});

const server = require('./config/server.js');

new server().initialize();