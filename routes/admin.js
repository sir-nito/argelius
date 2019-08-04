'use strict'
var express= require('express');
var AdminController = require('../controllers/admin');
var api= express.Router();
var middleware = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload= multipart({uploadDir:'../uploads/usuario'});

api.post('/registrar',AdminController.Registrar);
api.get('/validar/:id',AdminController.validarcuenta);
api.post('/Iniciar-Sesion',AdminController.IniciarSession);
api.get('/usuario/:id', middleware.ensureAuth, AdminController.getUser);
api.put('/Actualizar-usuario/:id', middleware.ensureAuth, AdminController.updateUser);
api.post('/subir-imagen/:id', [middleware.ensureAuth,md_upload], AdminController.uploadImage);
api.get('/obtener-imagen/:imageFile',AdminController.getImageFile);
module.exports=api;