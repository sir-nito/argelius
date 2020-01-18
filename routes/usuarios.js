'use strict'
var express = require('express');
var UserController = require('../controllers/usuarios');
var api = express.Router();
var middleware = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/usuario' });

api.post('/registrar', UserController.agregar);
api.get('/obtenerUsuarioByID/:id', UserController.getUser);
api.put('/actualizar/:id', UserController.actualizar);
api.get('/obtener-usuarios/:id?', UserController.obtener);
api.delete('/eliminar/:id', UserController.eliminar);
module.exports = api;