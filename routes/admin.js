'use strict'
var express= require('express');
var AdminController = require('../controllers/admin');
var api= express.Router();
var middleware = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload= multipart({uploadDir:'../uploads/usuario'});

api.post('/A_registrar',AdminController.Registrar);
api.get('/A_validar/:id',AdminController.validarcuenta);
api.post('/A_Iniciar-Sesion',AdminController.IniciarSession);
api.get('/A_usuario/:id', middleware.ensureAuth, AdminController.getUser);
api.put('/A_Actualizar-usuario/:id', middleware.ensureAuth, AdminController.updateUser);
api.post('/A_subir-imagen/:id', [middleware.ensureAuth,md_upload], AdminController.uploadImage);
api.get('/A_obtener-imagen/:imageFile',AdminController.getImageFile);
module.exports=api;