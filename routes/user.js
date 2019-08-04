'use strict'
var express= require('express');
var UserController = require('../controllers/user');
var api= express.Router();
var middleware = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload= multipart({uploadDir:'../uploads/usuario'});

api.post('/registrar',UserController.Registrar);
api.get('/validar/:id',UserController.validarcuenta);
api.post('/Iniciar-Sesion',UserController.IniciarSession);
api.get('/user/:id', middleware.ensureAuth, UserController.getUser);
api.put('/update-user/:id', middleware.ensureAuth, UserController.updateUser);
api.post('/upload-image-user/:id', [middleware.ensureAuth,md_upload], UserController.uploadImage);
api.get('/get-image-user/:imageFile',UserController.getImageFile);
module.exports=api;