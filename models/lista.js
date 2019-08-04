'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ListaSchema = Schema({
    marcador:String,
    create_at:String,
    usuario:String
});



module.exports = mongoose.model('Lista',ListaSchema);