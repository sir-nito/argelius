'use strict'


var express = require('express');
var ListaController = require('../controllers/lista');
var api = express.Router();
var middleware = require('../middlewares/authenticated');

api.post('/guardar-marcador',middleware.ensureAuth,ListaController.crearMarcador);
api.get('/obtener-marcadores/:id',middleware.ensureAuth,ListaController.getMisMarcadores);
api.delete('/borrar',middleware.ensureAuth,ListaController.deleteMarcador);

module.exports=api; 