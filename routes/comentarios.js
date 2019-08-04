'use strict'


var express = require('express');
var ComentariosController = require('../controllers/comentarios');
var api = express.Router();
var middleware = require('../middlewares/authenticated');

api.post('/enviar-comentario',middleware.ensureAuth,ComentariosController.sendComentario);
api.get('/get-comentarios/:id',middleware.ensureAuth,ComentariosController.getComentarios);
//api.delete('/delete-my-Places',middleware.ensureAuth,MyPlacesController.deleteMyPlaces);

module.exports=api; 
