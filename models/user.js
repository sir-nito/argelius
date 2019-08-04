'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    nombre:String,
    apellido_paterno:String,
    apellido_materno:String,
    status:String,
    correo:String,
    version:String,
    password:String,
    imagen:String
});

module.exports = mongoose.model('User',UserSchema);