'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var VideoSchema = Schema({
    categoria:String,
    nombre:String,
    descripcion:String,
    imagen:String,
    video:String,
    direccion:String,
    horario:String,
    url:String,
    create_at:String
});

module.exports = mongoose.model('Video',VideoSchema);