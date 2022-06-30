'use strict'

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

const express = require("express");
const route = express.Router();

const authController = require("../app/http/controllers/authController");
const pdfController = require("../app/http/controllers/pdfController.js");

route.post('/signin', authController.sigin);
route.post('/login', authController.login);
route.post('/create', pdfController.create);

module.exports = route;