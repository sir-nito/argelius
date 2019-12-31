'use strict'
var express = require('express');
var UserController = require('../controllers/usuarios');
var api = express.Router();
var middleware = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/usuario' });

api.post('/registrar', UserController.agregar);
//api.get('/usuario/:id', middleware.ensureAuth, UserController.getUser);
api.put('/actualizar/:id', middleware.ensureAuth, UserController.actualizar);
api.get('/obtener-usuarios', middleware.ensureAuth, UserController.obtener);
api.delete('/eliminar/:id', middleware.ensureAuth, UserController.eliminar);
module.exports = api;